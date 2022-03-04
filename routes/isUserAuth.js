import { Router } from "express";

const router = Router();

import { getUser } from "../controllers/authentication.js";
import isAuth from "./guards/auth.js";

router.get('/', isAuth, getUser);

export default router;