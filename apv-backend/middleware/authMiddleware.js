import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //dejar solo el token
            token = req.headers.authorization.split(" ")[1];

            //verificar con .ENV
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //encontrar veterinario por ID
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            return next();

        } catch (error) {
            const e = new Error("Token no válido")
            return res.status(403).json({ msg: e.message })
        }
    }

    if (!token) {
        const error = new Error("Token no válido o inexsitente")
        res.status(403).json({ msg: error.message })
    }

    next();
};

export default checkAuth;