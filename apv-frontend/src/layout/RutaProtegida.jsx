import { Outlet, Navigate } from "react-router-dom"  //l Outlet es para que te muestre, desde acá (la ruta principal), los demas componentes.
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Loading from "../components/Loading"

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()

    if (cargando) return <Loading />

    return (
        <>
            <Header />

            {/* si está autenticado, que me muestre lo que sea de Outlet, sino no */}
            {auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}

            <Footer />
        </>
    )
}

export default RutaProtegida