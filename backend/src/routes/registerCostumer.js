import express from "express";
import registerCostumersController from "../controller/registerCostumersController.js";

const router = express.Router();

router.route("/").post(registerCostumersController.register)

router.route("/verifyCodeEmail").post(registerCostumersController.verifyCodeEmail);

export default router;
