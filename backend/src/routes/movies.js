import express from "express";
import moviesController from "../controller/moviesController.js";
import multer from "multer";

const router = express.Router();

// Configure a local folder to save the images
const upload = multer({dest: "public/"});

router.route("/")
.get(moviesController.getAllMovies)
.post(upload.single("image"), moviesController.insertMovies)

router.route("/:id")
.put(moviesController.updateMovies)
.delete(moviesController.deleteMovies);

export default router;