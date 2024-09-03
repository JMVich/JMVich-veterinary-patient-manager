import express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import cors from "cors";
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express();

//para que entienda que le enviaremos json
app.use(express.json());

dotenv.config();

conectarDB();


const dominiosPermitidos = [process.env.FRONTEND_URL]

//CORS controla que no se puedan acceder a los datos de la API, verifica que los dominios entén permitidos
const corsOptions = {
    origin: function (origin, callback) {
        //Si encuentra los dominios permitidos, si hay, si es true...retorna null(no da error), y true(le permite el acceso)
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request está permitido
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}

//Le decimos a express que use CORS
app.use(cors(corsOptions))

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});