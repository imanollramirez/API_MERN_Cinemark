// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser from "cookie-parser";
import customersRoutes from "./src/routes/costumers.js";
import employeeRoutes from "./src/routes/employees.js";
import moviesRoutes from "./src/routes/movies.js"
import registerEmployesRoutes from "./src/routes/registerEmployees.js";
import registerCostumersRoutes from "./src/routes/registerCostumer.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/customers", customersRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/movies", moviesRoutes);

app.use("/api/registerEmployees", registerEmployesRoutes);
app.use("/api/registerCostumers", registerCostumersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
