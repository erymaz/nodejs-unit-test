import mongoose, { CallbackError } from "mongoose";
import { DATABASE, DB_CONN_STRING } from "../constants";

export default function connectToMongoDB () {
  mongoose.connect(`${DB_CONN_STRING}/${DATABASE}`, (err: CallbackError) => {
    if (err) {
      console.log("Error in connecting to database", err.message);
    } else {
      console.log('🚀 Connected to database 🚀');
    }
  });
}
