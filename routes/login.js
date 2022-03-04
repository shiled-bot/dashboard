import { Router } from "express";

const router = Router();

import { login } from "../controllers/authentication.js";

router.post('/', login);

export default router;