import { startDB } from "$db/dbConnect";

// start db server(runs ones: when server first loads)
startDB().then(() => {
  console.log('MongoDB started!')
}).catch(err => {
  console.error(err)
})