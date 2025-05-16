
import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
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
        typeUser: {
            type: Number,
            require: true
        },
        hireDate: {
            type: Date,
            require: true
        },
        salary: {
            type: Number,
            require: true
        },
        dui: {
            type: String,
            require: true
        }
    },
    {
      timestamps: true,
      strict: false,
    }
);

export default model ("employees", employeeSchema);