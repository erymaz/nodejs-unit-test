import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DATABASE, DB_CONN_STRING } from "../../src/constants";
import config from '../../config';

export = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGO_URI = DB_CONN_STRING;
  }

  await mongoose.connect(`${process.env.MONGO_URI}/${DATABASE}`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
