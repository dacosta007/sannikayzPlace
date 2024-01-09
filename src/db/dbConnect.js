import { MongoClient } from "mongodb"
import { MONGO_URI, MONGO_URI_DEV, NODE_ENV } from "$env/static/private"
import { DB_NAME, DB_NAME_DEV } from "$env/static/private"

const DB_URI = NODE_ENV === 'development' ? MONGO_URI_DEV : MONGO_URI
const DB_Name = NODE_ENV === 'development' ? DB_NAME_DEV : DB_NAME

const client = new MongoClient(DB_URI)

// connect to db
export function startDB() {
  console.log('DB starting!...')
  return client.connect()
}

// specify DB wanting to connect to
export const db = client.db(DB_Name)