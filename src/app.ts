import express from "express";
import expressFileUpload from "express-fileupload";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationsController from "./6-controllers/vacations-controller";
import cors from 'cors';
import authController from "./6-controllers/auth-controller";
import sanitize from "./3-middleware/sanitize";

const server = express();//Creates an Express server instance.
const PORT = process.env.PORT || 3030;
server.use(cors({origin:"http://localhost:3000" }));//Adds CORS middleware to the Express server.
server.use(express.json());// Adds a JSON parser for handling incoming data in JSON format.
server.use(expressFileUpload());//Enables support for file uploads on the Express Server with express-fileupload library.
server.use(sanitize);// This is a middleware component which handles sanitization of incoming data to avoid malicious activity or code injection into my application.
server.use("/api", vacationsController);// Mounts the vacation controller route handler at /api prefix so all vacation routes will begin with /api.
server.use("/api", authController);// Mounts the authentication controller route handler at /api prefix so all authentication related routes will begin with /api.
server.use("*", routeNotFound);//Sets up a catch all route not found handler which catches any invalid requests and returns proper error responses.
server.use(catchAll);//Sets up a catch all handler which catches any invalid requests and returns proper error responses.
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'host',
    user: 'username',
    password: 'password',
    database: 'database_name'
});

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });





