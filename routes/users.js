import { Router } from "express";

const router = Router();

import { login, isAuth } from "../controllers/authentication.js";

router.get('/', isAuth)
router.post('/', login);

export default router;