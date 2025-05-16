import express from "express";
import registerCostumers from "../controller/costumersController.js";

const router = express.Router();
router.route("/")
.get(registerCostumers.getAllCostumers)
.post( registerCostumers.insertCostumers)

router
  .route("/:id")
  .put(registerCostumers.updateCostumer)
  .delete(registerCostumers.deleteCostumer);

export default router;