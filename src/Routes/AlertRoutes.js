import express from "express";
import { publishAlert } from "../Controllers/AlertController.js";

const router = express.Router();

router.post("/publish-alert", publishAlert);

export default router;