import 'dotenv/config'
import postgres from 'postgres'

const { DATABASE_URL } = process.env
const URL = DATABASE_URL

export const sql = postgres(URL, { ssl: 'require' })
