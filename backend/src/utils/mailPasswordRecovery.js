import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// ¿Quien lo envia?
const sendEmail = async (to, subject, body, html) => {
  try {
    const info = await transporter.sendMail({
      from: "aleimanolramirez@gmail.com",
      to, 
      subject, 
      body, 
      html,
    });

    return info;
  } catch (error) {
    console.log("error" + error);
  }
};

const HTMLRecoveryEmail = (code) => {
  return `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Recuperación de Cuenta</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: 'Poppins', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden;">
    
    <div style="background-color: #c8102e; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="margin: 0; font-size: 24px; font-family: 'Poppins', Arial, sans-serif;">Código de Recuperación</h1>
    </div>
    
    <div style="text-align: center;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Cinemark_Logo.svg/1200px-Cinemark_Logo.svg.png" alt="Logo" style="display: inline-block; max-width: 240px; padding-top: 30px">
</div>
    <div style="padding: 30px; text-align: center; font-family: 'Poppins', Arial, sans-serif;">
      <p style="margin: 0;">Hola,</p>
      <p>Recibimos una solicitud para recuperar el acceso a tu cuenta.</p>
      <p>Utiliza el siguiente código para completar el proceso:</p>
      
      <div style="display: inline-block; background-color: #eeeeee; font-size: 24px; letter-spacing: 4px; padding: 15px 30px; margin: 20px 0; border-radius: 5px; font-weight: 600; font-family: 'Poppins', Arial, sans-serif;">
        ${code}
      </div>
      
      <p>Este código es válido por 20 minutos.</p>
      <p>Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
    </div>
    
    <div style="background-color: #f9f9f9; color: #777777; text-align: center; padding: 20px; font-size: 12px; font-family: 'Poppins', Arial, sans-serif;">
      © 2025 Cinemark. Todos los derechos reservados.
    </div>
  </div>
</body>
</html>

    `;
};

export { sendEmail, HTMLRecoveryEmail };
