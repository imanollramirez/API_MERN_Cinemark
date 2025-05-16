import express from "express"
import loginController from "../controller/loginController.js"
const router = express.Router();

router.route("/").post(loginController.login)

export default router;