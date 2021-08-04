import * as express from "express";

const bodyParser = require("body-parser");
const cors = require("cors");

import {mainController} from "./controllers/main";

const app = express();

//Setup Middlewares

//Allow Cross Origin Resource Sharing
app.use(cors());

//Parse application/json content-type
app.use(bodyParser.json());

//Parse application/x-www-form-urlencoded content-type
app.use(bodyParser.urlencoded({ extended: true }));

//Load Main Controller
app.use(mainController); 

export default app;
