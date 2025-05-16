
import { Schema, model } from "mongoose";

const movieSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        director: {
            type: String,
            require: true
        },
        genre: {
            type: String,
            require: true
        },
        year: {
            type: Number,
            require: true
        },
        duration: {
            type: Number,
            require: true
        },
        image: {
            type: Number,
            require: true
        }
    }
);

export default model ("movies", movieSchema);