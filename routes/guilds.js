import { Router } from "express";

const router = Router();

import authGuard from "./guards/auth.js";
import { getUserGuilds } from "../controllers/users.js";

router.use(authGuard);

router.get('/', getUserGuilds);

export default router;