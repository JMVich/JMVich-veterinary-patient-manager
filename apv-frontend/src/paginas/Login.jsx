import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {
    //const { auth } = useAuth()  //Así tenemos disponible a auth, que viene del context, se hace un destructure, ya que es un objeto.

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        //Validación de campos vacíos
        if ([email, password].includes('')) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password })
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')  //una vez que se inicia el usuario correctamente, se lo redirige a /admin
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
                <h1 className="text-indigo-600 font-black text-5xl sm:text-6xl">Inicia sesión y administra tus <span className="text-black">pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 pt-8 pb-6 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}
                <form className='flex flex-col' onSubmit={handleSubmit}>
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
                    </div>

                    <input
                        type="submit"
                        value="Iniciar sesión"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto self-center transition-colors"
                    />

                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className="block text-center my-5 text-gray-500 hover:text-gray-900"
                        to="/registrar">¿No tienes una cuenta? Regístrate</Link>
                    <Link
                        className="block text-center my-5 text-gray-500 hover:text-gray-900"
                        to="/olvide-password">Olvidé mi contraseña</Link>
                </nav>

            </div>

        </>
    )
}

export default Login;