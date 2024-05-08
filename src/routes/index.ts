import express from "express";
import { templateRouter } from "./template";
const router = express.Router();

router.use("/template", templateRouter);

export default router;
