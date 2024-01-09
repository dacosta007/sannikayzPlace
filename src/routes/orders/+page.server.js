import { error, fail } from "@sveltejs/kit"
import Orders from '$db/collections/Orders';


export async function load() {
  return {};
};



export const actions = {
  orders: async ({ request }) => {
    const { orderId } = Object.fromEntries(await request.formData());
    
    const findOrder = await Orders.findOne({ orderId: orderId });

    if (findOrder === null || findOrder === '') {
      throw error(401, {
        error: true,
        msg: "Invalid ID format. Please check and try again."
      });
    }

    return {
      success: true,
      order: JSON.parse(JSON.stringify(findOrder)) // help convert MongoDB data into POJO(Plain Old JS Object)
    }
  },
  completeOrder: async ({ request }) => {
    const { paycode:payCode, orderId  } = Object.fromEntries(await request.formData());

    let findQuery = { orderId, payCode };
    let updtQuery = { $set: { payStatus: 'paid', status: 'preparing' } };
    const updtOrder = await Orders.updateOne(findQuery, updtQuery);

    if (updtOrder === null || updtOrder === '') {
      return fail(400, { error: true, msg: "Unable to complete order. Please try again later." });
    }

    return { success: true, payStatus: 'paid', status: 'preparing' }
  }
};