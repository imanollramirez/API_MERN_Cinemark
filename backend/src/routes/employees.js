import express from "express";
import employeesController from "../controller/employeesController.js";

const router = express.Router();
router.route("/")
.get(employeesController.getAllEmployees)
.post( employeesController.insertEmployees)

router
  .route("/:id")
  .put(employeesController.updateEmployees)
  .delete(employeesController.deleteEmployees);

export default router;