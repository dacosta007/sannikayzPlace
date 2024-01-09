import { fail, json } from "@sveltejs/kit";
import sgMail from '@sendgrid/mail';
import { NODE_ENV, SENDGRID_API_KEY } from '$env/static/private';
import { COMPANY_EMAIL, COMPANY_EMAIL_DEV, TEMPLATE_ID_CONTACT_FRM } from '$env/static/private';

// set required 'sendGrid' api key for sending email
sgMail.setApiKey(SENDGRID_API_KEY);

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

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const frmData = await request.json(); // data from form submission
  const { fname, lname, email, phone } = frmData;
  const { subject, message } = frmData;

  /* send email notification to company's mail address */
  const tempId = TEMPLATE_ID_CONTACT_FRM; // template email ID for contact form(to be sent to company)
  const tempData = { fname, lname, email, phone, subject, message, date: new Date().toDateString() }; // template Email Data for customer & company
  
  try {
    const companyEmail = (NODE_ENV != 'development') ? COMPANY_EMAIL : COMPANY_EMAIL_DEV;
    const sendMail = await sendEmail(companyEmail, tempId, tempData);

    if(sendMail != true) {
      return fail(400, { error: true, msg: "Unable to send message at the moment, please try again in a little while." });
    }

    return json({ success: true, msg: 'Your message is well received, and we will respond to all your queries shortly(within 24hrs.). Thank you.' });
  } catch (err) {
    return fail(500, { error: true, msg: "Server error, and unable to send message at the moment. Please try again later." })
  }
}