//  Usando los context, el estado definido abajo (auth y set Auth) estarán SINCRONIZADOS en todos los archivos en los cuáles sean importados 

import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {  //ese children es para indicarle a AuthProvider que tiene hijos, que los reconozca

    const [cargando, setCargando] = useState(true)

    //ese state estará disponible en toda la aplicación, ya que en app.jsx, AuthProvider engloba todo
    //ese auth lo importaremos o usaremos en cualquier archivo usando un customHook (en este caso/curso), pero hay otras maneras
    const [auth, setAuth] = useState({})


    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return  //si token es false, que te saque de la función
            }


            const config = {
                headers: {  //los headers se envían primeros en la petición
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)  //si ponemos clienteAxios solo, por default es clienteAxios.get, y config lo necesita como parámetro
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()

    }, []) //dependencias vacías para que se ejecute una sola vez


    //removemos el token, y a setAuth lo volvemos a setear como objeto vacío
    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }


    //actualizar el perfil del veterinario desde editar perfil
    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return  //si token es false, que te saque de la función
        }

        const config = {
            headers: {  //los headers se envían primeros en la petición
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)
            setAuth(data)


            return {
                msg: "Almacenado correctamente"
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }


    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return  //si token es false, que te saque de la función
        }

        const config = {
            headers: {  //los headers se envían primeros en la petición
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = "/veterinarios/actualizar-password"
            const {data} = await clienteAxios.put(url, datos, config)
            console.log(data)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}  //lo que está en value es lo que estará disponible cuando llamemos en otro archivo a useAuth()
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext