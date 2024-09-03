import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()

        //Validación de campos vacíos
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return;
        }

        //Validación de contraseñas diferentes
        if (password !== repetirPassword) {
            setAlerta({ msg: "Las contraseñas no coinciden", error: true })
            return;
        }

        //Validación de contraseña corta
        if (password.length < 6) {
            setAlerta({ msg: "Contraseña muy corta, agrega mínimo 6 caracteres", error: true })
            return;
        }

        setAlerta({})

        //Crear el usuario en la api

        try {
            await clienteAxios.post('/veterinarios', { nombre, email, password })
            setAlerta({
                msg: "Creado correctamente, revisa tu email",
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl sm:text-6xl">Crea tu cuenta y administra tus <span className="text-black">pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 pt-8 pb-6 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}

                <form
                    className='flex flex-col'
                    onSubmit={handleSubmit}
                >

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold">Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Introduce tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold">Email
                        </label>
                        <input
                            type="email"
                            placeholder="Introduce tu email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold">Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Introduce tu contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Repite tu contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Registrarse"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto self-center transition-colors"
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className="block text-center my-5 text-gray-500 hover:text-gray-900"
                        to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
                    <Link
                        className="block text-center my-5 text-gray-500 hover:text-gray-900"
                        to="/olvide-password">Olvidé mi contraseña</Link>
                </nav>
            </div>

        </>
    )
}

export default Registrar;