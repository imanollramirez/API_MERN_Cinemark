import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    port: process.env.PORT,
  },
  JWT: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  },
  ADMIN:{
    emailAdmin: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  },
  email: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  },
  cloudinary: {
    cloudinary_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  }
}