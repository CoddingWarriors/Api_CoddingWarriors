// Navbar.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import usuarioPerfil from "../img/usuario-de-perfil.png";
import LogoutModal from "./LogoutModal";
import styles from "../styles/Navbar.module.css";

function Navbar() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setShowLogoutModal(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleProfileClick = async () => {
        try {
            const response = await fetch("http://localhost:5000/verificar-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                setShowLogoutModal(true);
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Erro ao verificar o token:", error);
        }
    };

    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <ul className={styles.links}>
                <li className={styles.item}>
                    <Link to="/">Página Inicial</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/atendimento">Atendimento</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/faq">FAQ</Link>
                </li>
                <li className={styles.item}>
                    <img
                        src={usuarioPerfil}
                        alt="Usuário"
                        className={styles.usuarioPerfil}
                        onClick={handleProfileClick}
                    />
                </li>
            </ul>
            {showLogoutModal && (
                <LogoutModal
                    onLogout={handleLogout}
                    onCancel={handleCancelLogout}
                />
            )}
        </nav>
    );
}

export default Navbar;
