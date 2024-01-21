import * as dotenv from "dotenv"

dotenv.config()

export const PORT = 4001;
export const DATABASE = process.env.DATABASE || 'boo';
export const DB_CONN_STRING = process.env.DB_CONN_STRING || '';
