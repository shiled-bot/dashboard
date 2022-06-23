import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import parser from "body-parser"
import cookieParser from "cookie-parser"

const bodyParser = parser.json();
const app = express();
const port = process.env.PORT || 8080;
const { DB_URI, CLIENT_ORIGIN } = process.env;

app.use(cookieParser())
app.use(bodyParser)
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

// routers
import usersRouter from "./routes/users.js";
import guildsRouter from "./routes/guilds.js";

app.use("/users", usersRouter);
app.use("/guilds", guildsRouter)

mongoose.connect(DB_URI)
    .then(() => {
        app.listen(port, () => console.log('Server Is Running On Port ' + port));
    })
    .catch(console.error);