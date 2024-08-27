import { Router } from "express";
import authGroup from "./authGroup.js";

const router = Router();
router.use('/auth', authGroup);

export default router;
