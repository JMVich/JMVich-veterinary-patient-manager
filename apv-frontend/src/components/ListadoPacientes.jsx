import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {

    const { pacientes } = usePacientes()

    return (
        <>
            {/*Si hay pacientes que te los muestre, y sino no*/}
            {pacientes.length
                ?
                (
                    <>
                        <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>

                        <p className="text-xl mt-5 mb-10 text-center">
                            Administra tus {''}
                            <span className="text-indigo-600 font-bold">pacientes y citas</span>
                        </p>

                        {/*Mapeamos los pacientes para mostrarlos*/}
                        {pacientes.map(paciente => (
                            <Paciente
                                key={paciente._id}
                                paciente={paciente}
                            />
                        ))}
                    </>
                )
                :
                (
                    <>
                        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

                        <p className="text-xl mt-5 mb-10 text-center">
                            Agrega pacientes y {''}
                            <span className="text-indigo-600 font-bold">aparecerán en este lugar</span>
                        </p>
                    </>
                )}
        </>
    )
}

export default ListadoPacientes