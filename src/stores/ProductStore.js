import { writable } from 'svelte/store'

async function products() {
  try {
    const res = await (await fetch('http://localhost:4000/products')).json();
    return res;
  } catch (err) {
    console.error(`Server Error: ${err.message}`)
  }
}

export const ProductStore = writable(products)