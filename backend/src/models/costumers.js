
import { Schema, model } from "mongoose";

const costumerSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        telephone: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        },
        dui: {
            type: String,
            require: true
        }
    }
);

export default model ("costumers", costumerSchema);