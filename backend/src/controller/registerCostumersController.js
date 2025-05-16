// Importar el modelo
import costumersModel from "../models/costumers.js";
import bcryptjs from "bcryptjs"; //Encriptar
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

const registerCostumersController = {};

registerCostumersController.register = async(req, res)=> {
    const { name,email,password,telephone,address, dui } = req.body;

    try {
        // Varificar si el costumere ya existe
        const existingCostumer = await costumersModel.findOne({ email });
        if (existingCostumer) {
          return res.json({ message: "Costumer already exists!" });
        }
    
        // Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);
    
        // Guardamos en la base de datos
        const newCostumer = new costumersModel({
            name,email,password: passwordHash,telephone,address, dui
        });
    
        await newCostumer.save();
    
        // Genearar un codigo de verificacion
        const verficationCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas
    
        // TOKEN
        const tokenCode = jsonwebtoken.sign(
          {
            //1- ¿que vamos a guardar?
            email,
            verficationCode,
            expiresAt,
          },
          //2- secreto
          config.JWT.secret,
          { expiresIn: config.JWT.expiresIn }
        );
    
        // Guardar el token en una cookie
        res.cookie("verificationToken", tokenCode, {
          maxAge: 2 * 60 * 60 * 1000, // Duración de la cookie: 2 horas
        });
    
        // Enviar correo
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: config.email.user,
            pass: config.email.pass,
          },
        });
    
        //2- Options: ¿A quien se lo voy a enviar?
        const mailOptions = {
          from: config.email.user,
          to: email,
          subject: "Email verification",
          text: `Para verificar que eres dueño de la cuenta, utiliza este codigo ${verficationCode}\n Este codigo expira en dos horas\n`,
        };
    
        //3- Envio del correo
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) console.log("error" + error);
          res.json({ message: "Email sent!" });
        });
    
        res.json({ message: "Costumer registered, Please verify your email!" });
      } catch (error) {
        res.json({ message: "error" + error });
      }
    };

    registerCostumersController.verifyCodeEmail = async (req, res) => {
        const { verficationCode } = req.body;

        const token = req.cookies.verificationToken;
      
        if (!token) {
          return res.json({ message: "Please register your account first!" });
        }
      
        try {
          
          const decoded = jsonwebtoken.verify(token, config.JWT.secret);
          const { email, verficationCode: storedCode } = decoded;
      
          if (verficationCode !== storedCode) {
            return res.json({ message: "Invalid verification code!" });
          }
      
          const costumer = await costumersModel.findOne({ email });
          if (!costumer) {
            return res.json({ message: "Costumer not found!" });
          }
      
          costumer.isVerified = true;
          await costumer.save();
      
          res.clearCookie("verificationToken");
      
          res.json({ message: "Email verified successfully!" });
        } catch (error) {
          res.json({ message: "error" + error });
        }
      };



export default registerCostumersController;
