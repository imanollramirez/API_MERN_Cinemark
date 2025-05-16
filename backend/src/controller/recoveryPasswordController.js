import jsonwebtoken from "jsonwebtoken"; //Token
import clientsModel from "../models/costumers.js";
import employeesModel from "../models/employees.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

//1- Crear un array de funciones
const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await clientsModel.findOne({ email });
    if (userFound) {
      userType = "costumer";
    } else {
      userFound = await employeesModel.findOne({ email });
      if (userFound) {
        userType = "employee";
      }
    }

    if (!userFound) {
      res.json({ message: "User not found!" });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    //Guardamos todo en un token
    const token = jsonwebtoken.sign(
      //1-¿Que voy a guardar?
      { email, code, userType, verified: false },
      //2-secret key
      config.JWT.secret,
      //3-¿Cuando expira?
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });
    await sendEmail(
      email,
      "Verification Code - Cinemark", 
      "Hello There!, hope you're having a wonderful day!",
      HTMLRecoveryEmail(code)
    );

    res.json({ message: "email sent succesfully!" });
  } catch (error) {
    console.log("error" + error);
  }
};

passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    //Sacar el token de las cookies
    const token = req.cookies.tokenRecoveryCode;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.json({ message: "Invalid code!" });
    }

    //Marcar el token como verificado
    const newToken = jsonwebtoken.sign(
      //1-¿Que vamos a guardar?
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      //2- Secret key
      config.JWT.secret,
      //3- ¿Cuando expira?
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });

    res.json({ message: "Code verified!" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default passwordRecoveryController;
