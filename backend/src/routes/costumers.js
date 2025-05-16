import express from "express";
import costumersController from "../controller/costumersController.js";

const router = express.Router();
router.route("/")
.get(costumersController.getAllCostumers)
.post( costumersController.insertCostumers)

router
  .route("/:id")
  .put(costumersController.updateCostumer)
  .delete(costumersController.deleteCostumer);

export default router;