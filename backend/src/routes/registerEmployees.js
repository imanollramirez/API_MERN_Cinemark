import express from "express";
import registerEmployeeController from "../controller/registerEmployeesController.js";
const router = express.Router();

router.route("/").post(registerEmployeeController.register);

export default router;
