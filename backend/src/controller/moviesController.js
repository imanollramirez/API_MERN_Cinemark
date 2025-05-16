import moviesModel from "../models/movies.js"
import { v2 as cloudinary} from "cloudinary";

import {config} from "../config.js";

// 1- Configure cloudinary con nuestra cuenta
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
})

// Empty function array 
const moviesController = {};

// SELECT 
moviesController.getAllMovies = async (req,res) => {  
    const movies = await moviesModel.find();
    res.json(movies);
}

// INSERT
moviesController.insertMovies = async (req,res) => {
    const { title, description,director,genre,year,duration } = req.body;
    let imageURL = ""

    // Upload the images to cloudinary
    if(req.file)
    {
        const result = await cloudinary.uploader.upload(
            req.file.path,
            { 
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        )

        // Save the URL where the Image was uploaded to.
        imageURL = result.secure_url
    }
    
    // Save everything in the DB.
    const newMovie = new moviesModel({title, description,director,genre,year,duration})
    await newMovie.save();

    res.json({message: "Movie saved! "})
}

// DELETE
moviesController.deleteMovies = async (req, res) => {
    const deleteMovie = await moviesModel.findByIdAndDelete(req.params.id);
      if (!deleteMovie) {
        return res.status(404).json({ message: "Movie wasn't found!" });
      }
      res.json({ message: "Movie deleted!" });
    };
    
    // UPDATE
    moviesController.updateMovies = async (req, res) => {
      
      const { title, description,director,genre,year,duration } = req.body;
      
      await moviesModel.findByIdAndUpdate(
        req.params.id,
        {
            title, description,director,genre,year,duration 
        },
        { new: true }
      );
      
      res.json({ message: "Movie updated!" });
    };

export default moviesController;