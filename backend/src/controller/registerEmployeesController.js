// Importar el modelo
import employeeModel from "../models/employees.js";
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.register = async(req, res)=> {
    const {name, 
        lastName, 
        birthday,
        email,
        address,
        password,
        hireDate,
        telephone,
        dui,
        isVerified,
        issnumber,
    } = req.body;

    try {
        const existEmployee = await employeeModel.findOne({email})
        if(existEmployee) {
            return res.json({message: "Employee already exist!"})
        } 

        const passwordHash = await bcryptjs.hash(password, 10)

        const newEmployee = new employeeModel({name, 
        lastName, 
        birthday,
        email,
        address,
        password: passwordHash,
        hireDate,
        telephone,
        dui,
        isVerified,
        issnumber,
        })

        await newEmployee.save();

        //TOKEN
        jsonwebtoken.sign(
            //1- Que voy a guardar
            {id: newEmployee._id},
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- funcion flecha
            (error, token) =>{
                if(error) console.log("error"+error)
                
                res.cookie("authToken", token)
                res.json({message: "Employee saved!"})
            }
        )

    } catch (error) {
        console.log("error"+error)
        res.json({message: "Error saving the employee!"})
    }
} 

export default registerEmployeeController;
