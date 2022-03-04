import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import parser from "body-parser"

const bodyParser = parser.json();
const app = express();
const port = process.env.PORT || 8080;
const { DB_URI, CLIENT_ORIGIN } = process.env;

app.use(bodyParser)
app.use(cors({origin: CLIENT_ORIGIN}));

// routers
import loginRouter from "./routes/login.js";
import isUserAuthRouter from "./routes/isUserAuth.js";

app.use("/login", loginRouter);
app.use("/isUserAuth", isUserAuthRouter)

mongoose.connect(DB_URI)
.then(() => {
    app.listen(port, () => console.log('Server Is Running On Port ' + port));
})
.catch(console.error);