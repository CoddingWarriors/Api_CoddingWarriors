import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../img/logo.png"
import usuarioPerfil from "../img/usuario-de-perfil.png"
import LogoutModal from "./LogoutModal"
import styles from "../styles/Navbar.module.css"
import { Toaster, toast } from "react-hot-toast"

function Navbar() {
    const navigate = useNavigate()
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userType, setUserType] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
            fetchUserType(token)
        }
    }, [])

    const fetchUserType = async (token:any) => {
        try {
            const response = await fetch("http://localhost:5000/usuariotipo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ token }),
            })

            if (response.ok) {
                const data = await response.json()
                setUserType(data.tipoUsuario)
            } else {
                console.error("Erro ao obter o tipo de usuário")
            }
        } catch (error) {
            console.error("Erro ao verificar o tipo de usuário:", error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setShowLogoutModal(false)
        setIsLoggedIn(false)
        setUserType(null)

        // Exibe o alerta e redireciona após 1 segundo
        toast.success("Você saiu da sua conta.")
        setTimeout(() => {
            navigate("/")
        }, 1)
    }

    const handleCancelLogout = () => {
        setShowLogoutModal(false)
    }

    return (
        <nav>
            <Toaster />
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <ul className={styles.links}>
                {(userType === '1' || userType === null) && (
                    <>
                    <li className={styles.item}>
                        <Link to="/">Página Inicial</Link>
                    </li>
                    <li className={styles.item}>
                        <Link
                            to="/atendimento"
                            style={{ cursor: "pointer" }}
                        >
                            Atendimento
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/faq">FAQ</Link>
                    </li>
                </>
                )}
                {userType === '2' && (
                <>
                    <li className={styles.item}>
                        <Link
                            to="/chamados"
                            style={{ cursor: "pointer" }}
                        >
                            Chamados
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link
                            to="/visualizarequipamento"
                            style={{ cursor: "pointer" }}
                        >
                            Equipamentos
                        </Link>
                    </li>
                </>
                )}
                {userType === '3' && (
                <>
                    <li className={styles.item}>
                        <Link
                            to="/homeadm"
                            style={{ cursor: "pointer" }}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link
                            to="/visualizarequipamento"
                            style={{ cursor: "pointer" }}
                        >
                            Equipamentos
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link
                            to="/cadastrosuporte"
                            style={{ cursor: "pointer" }}
                        >
                            Cadastro de usuário
                        </Link>
                    </li>
                </>
                )}

                <li className={styles.item}>
                    {isLoggedIn ? (
                        <img
                            src={usuarioPerfil}
                            alt="Usuário"
                            className={styles.usuarioPerfil}
                            onClick={() => setShowLogoutModal(true)}
                        />
                    ) : (
                        <button className={styles.login}>
                            <Link to="/login">Login</Link>
                        </button>
                    )}
                </li>
            </ul>
            {showLogoutModal && <LogoutModal onLogout={handleLogout} onCancel={handleCancelLogout} />}
        </nav>
    )
}

export default Navbar
