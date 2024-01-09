import Products from '$db/collections/Products'


/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    // query DB for all food products (should limit the products result set in future)
    const allProducts = await Products.find().toArray()
    
    // help convert mongodb _id property value to a more POJO which svelteKit can easily serialize
    let parsedDBData = JSON.parse(JSON.stringify(allProducts))
    
    return {
      allProducts: parsedDBData
    }
  } catch (error) {
    console.log(`Error from Layout fetching data: \n ${error}`)
  }
}