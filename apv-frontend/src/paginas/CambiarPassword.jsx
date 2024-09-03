import { useState } from "react"
import Alerta from "../components/Alerta"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({})

    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        //si hay al menos un campo vacío...
        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return
        }

        //si el pwd nuevo tiene menos de 6 caracteres
        if (password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: "La contraseña debe tener mínimo 6 caracteres",
                error: true
            })
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return
        }

        const respuesta = await guardarPassword(password)

        setAlerta(respuesta)
        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }

    const { msg } = alerta

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar contraseña</h2>
            <p className="text-xl mt-2 mb-10 text-center">Modifica tu {''}
                <span className="text-indigo-600 font-bold">contraseña aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {msg && <Alerta
                        alerta={alerta}
                    />
                    }

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Contraseña actual</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-2 mb-4 rounded-lg"
                                name="pwd_actual"
                                placeholder="Introduce tu contraseña actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Contraseña nueva</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-2 mb-4 rounded-lg"
                                name="pwd_nuevo"
                                placeholder="Introduce tu nueva contraseña"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Actualizar contraseña"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-2 cursor-pointer hover:bg-indigo-800 transition-colors"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPassword