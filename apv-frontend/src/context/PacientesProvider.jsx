import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {

    const { auth } = useAuth();

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    //obtener a todos los pacientes
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth])


    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                //sincronizar en vivo cuando guardas cambios (sino tenes que refrescar cada vez que haces update)
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)

                //sacamos createdAt, updatedAt, __v porque es innecesario
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data

                setPacientes([pacienteAlmacenado, ...pacientes])

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }


    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {

        //ese confirm, crea una alerta del navegador, devuelve true (aceptar) o false (cancelar)
        const confirmar = confirm("¿Confirmas que deseas eliminar?")

        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)

                //sincronizar en vivo cuando eliminas (sino tenes que refrescar cada vez que eliminas)
                const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;