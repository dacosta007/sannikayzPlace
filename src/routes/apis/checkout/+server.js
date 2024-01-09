import { json } from '@sveltejs/kit';
import { customAlphabet } from 'nanoid'
import { NODE_ENV, SENDGRID_API_KEY } from '$env/static/private';
import { COMPANY_EMAIL, COMPANY_EMAIL_DEV } from '$env/static/private';
import { TEMPLATE_ID_COMPANY, TEMPLATE_ID_CUSTOMER, TEMPLATE_ID_RECEIPT } from '$env/static/private';
import { formatCurrency } from '$lib/utilities/formatMoney'
import Orders from '$db/collections/Orders';
import sgMail from '@sendgrid/mail';


// set required 'sendGrid' api key for sending email
sgMail.setApiKey(SENDGRID_API_KEY)

// help send email
async function sendEmail(emailTo, templateId, templateData) {
  // format for sendGrid email API reques body
  const msg = {
    from: {
      email: "noreply@nine11homes.com", // Use the email address or domain you verified with sendGrid
      name: "sannikayz-place"
    },
    template_id: templateId,
    personalizations: [{
      to: [
        {
          email: emailTo
        }
      ],
      dynamic_template_data: templateData
    }]
  }

  try {
    await sgMail.send(msg)
    // console.log("Mail successfully sent!...")
    return true
  } catch (err) {
    console.error(JSON.stringify(err))
  }
}

// help format order data to be sent via email to customer
function fmtMailOrderData(ordData) {
  const mailData = ordData.map(ele => {
    return { 
      title: ele.title,
      qty: ele.qty,
      price: (formatCurrency(ele.price)).price,
      amt: formatCurrency(ele.price * ele.qty).price
    }
  });

  return mailData;
}


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  /* @DESC:
    - Get cart items order info from request & sanitize them
    - Get user's/customer's data info from request & sanitize them
    - Save order info into appropriate DB collection('orders')
    - Send order notification email to the company and also a mail notification to the customer/user on how make payment 
      for the order made by them.
    - After all processes are successful, return a success message 
  */
  const orderData = await request.json();
  const { fname, lname, email, address, phone } = orderData
  const { orders, orderId, orderMthd, paymentMthd } = orderData
  const { amount, date } = orderData

  // this will be included in email sent to the company(which when successful payment, company will sent to the customer to generate receipt)
  const payCode = customAlphabet('0123456789asdfjklbveiqwABCDEFIJK', 8);

  // set the payment code(to be sent to customer after payment(transfer/cash) has been made)
  orderData['payCode'] = payCode();

  // template email IDs for company and customer
  const tempIdForCompany = TEMPLATE_ID_COMPANY;
  const tempIdForCustomer = TEMPLATE_ID_CUSTOMER;

  // template Email Data for customer & company
  const tempDataForCustomer = {
    fname,
    lname,
    date: new Date(date).toDateString(),
    orderId,
    orderMthd,
    paymentMthd,
    address,
    amount: (formatCurrency(amount)).price,
    orders: fmtMailOrderData(orders),
    totalQty: orders.reduce((acc, ele) => acc += ele.qty, 0)
  };

  const tempDataForCompany = {
    fname,
    lname,
    email,
    phone,
    payCode: payCode(),
    orderId,
    orderMthd,
    paymentMthd,
    address,
    orders: fmtMailOrderData(orders),
    amount: (formatCurrency(amount)).price,
    date: new Date(date).toDateString(),
    totalQty: orders.reduce((acc, ele) => acc += ele.qty, 0)
  };

  try {
    /* === Save order into DB(in 'orders' collection/table) === */
    const saveOrder = await Orders.insertOne(orderData)
    if (!saveOrder?.acknowledged || saveOrder?.insertedId === undefined || !saveOrder?.insertedId) {
      return json({ error: true, msg: 'Error while completing order. Please try again in a little while.' });
    }

    /* === Send email notification to company & customer === */
    const companyEmail = (NODE_ENV != 'development') ? COMPANY_EMAIL : COMPANY_EMAIL_DEV;
    const sendMails = await Promise.allSettled([
      await sendEmail(email, tempIdForCustomer, tempDataForCustomer),
      await sendEmail(companyEmail, tempIdForCompany, tempDataForCompany)
    ])
    const sentResponse = sendMails.every(ele => ele.status === 'fulfilled' && ele.value === true);
    
    // check if there isn't any errors
    if (sentResponse === false) {
      return json({ error: true, msg: 'Sorry, error sending email order notification' }, 503);
    }
    
    return json({ success: true, msg: 'success'}, 201);
  } catch (err) {
    // console.error(err)
    return json({ error: true, msg: 'Server Error!. Please try again in a little while' }, 500);
  }
}