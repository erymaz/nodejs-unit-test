import express from "express";
import cors from "cors";

import routerApi from "./api";
// import connectToMongoDB from "./services/globalSetup.service";
import { PORT } from './constants';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
// connectToMongoDB();

app.use('/api', routerApi);

// catch 404 errors
app.use(function (req, res) {
  res.status(404).send('Unable to find the requested resource!');
});

export const server = app.listen(PORT, () => {
  console.log(`🚀 App listening on the port ${PORT} 🚀`);
});
