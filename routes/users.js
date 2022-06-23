import { Router } from "express";

const router = Router();

import { login, logout, isAuth } from "../controllers/authentication.js";

router.get('/', isAuth)
router.post('/', login);
router.get('/logout', logout)

export default router;