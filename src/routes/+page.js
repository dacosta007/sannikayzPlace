
/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    // getting data from the layout server(+layout.server.js) load function
    const data = await parent()
    // console.log(data.allProducts)
    
    return {
        products: data?.allProducts ?? []
    };
};