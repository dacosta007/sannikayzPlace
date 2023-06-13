import { MongoClient } from "mongodb"
import { MONGO_URI, MONGO_URI_DEV } from "$env/static/private"

const client = new MongoClient(MONGO_URI_DEV)

// connect to db
export function startDB() {
  console.log('DB starting!...')
  return client.connect()
}

// specify DB wanting to connect to
export const db = client.db('foodRestaurant')