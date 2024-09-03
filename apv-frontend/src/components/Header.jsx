import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from "react";

const Header = () => {

    const { cerrarSesion } = useAuth()

    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <header className="py-10 px-5 bg-indigo-600">

            <div className="flex items-center justify-between border-b border-indigo-600 py-8">
                <h1 className="font-bold text-2xl text-indigo-200 text-center pr-5">
                    Administrador de Pacientes de {''}
                    <span className="text-white font-black">Veterinaria</span>
                </h1>
                <nav>
                    <section className="MOBILE-MENU flex lg:hidden">
                        <div
                            className="HAMBURGER-ICON space-y-2"
                            onClick={() => setIsNavOpen((prev) => !prev)}
                        >
                            <span className="block h-0.5 w-8 bg-white"></span>
                            <span className="block h-0.5 w-8 bg-white"></span>
                            <span className="block h-0.5 w-8 bg-white"></span>
                        </div>

                        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                            <div
                                className="absolute right-0 px-8 py-8"
                                onClick={() => setIsNavOpen(false)}
                            >
                                <svg
                                    className="h-8 w-8 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <ul className="flex flex-col items-center justify-evenly min-h-[160px]">
                                <li>
                                    <Link to="/admin" className="text-white text-sm uppercase font-bold">
                                        Pacientes</Link>
                                </li>
                                <li>
                                    <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">
                                        Perfil</Link>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={cerrarSesion}
                                        className="text-white text-sm uppercase font-bold">
                                        Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
                        <li>
                            <Link to="/admin" className="text-white text-sm uppercase font-bold hover:text-gray-400">
                                Pacientes</Link>
                        </li>
                        <li>
                            <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold hover:text-gray-400">
                                Perfil</Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={cerrarSesion}
                                className="text-white text-sm uppercase font-bold hover:text-gray-400">
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </nav>
                <style>
                    {`
                    .hideMenuNav {
                        display: none;
                    }
                    .showMenuNav {
                        display: block;
                        position: absolute;
                        width: 100%;
                        height: 13em;
                        top: 0;
                        left: 0;
                        --tw-bg-opacity: 1;
                        background-color: rgb(79 70 229 / var(--tw-bg-opacity));
                        z-index: 10;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                        align-items: center;
                    }

                    @media (min-width: 575px) and (max-width: 1003px) {
                        .showMenuNav {
                            height: 11em;
                        }
                    }

                    @media (max-width: 370px) {
                        .showMenuNav {
                            top: 17px;
                        }
                    }
                        
                    `}
                </style>
            </div>
        </header>
    )
}

export default Header