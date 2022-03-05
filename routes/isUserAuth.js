import { Router } from "express";

const router = Router();

import { isAuth } from "../controllers/authentication.js";

router.get('/', isAuth);

export default router;