import usePacientes from "../hooks/usePacientes"

const Paciente = ({ paciente }) => {

    const { setEdicion, eliminarPaciente } = usePacientes()

    const { email, fecha, nombre, propietario, sintomas, _id } = paciente

    //Formateamos la fecha porque se muestra mal (sin librerías)
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha)
    }

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-2 rounded-xl">
            <p className="font-bold uppercase text-indigo-700 my-2">Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Email: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Fecha de alta: {''}
                <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Síntomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-between my-5 max-[400px]:flex-col max-[400px]:gap-2">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg max-[400px]:m-auto"
                    onClick={() => setEdicion(paciente)}
                >Editar</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg max-[400px]:m-auto"
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente