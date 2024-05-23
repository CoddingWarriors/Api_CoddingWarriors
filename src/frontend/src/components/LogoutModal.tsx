// LogoutModal.tsx
import React, { useRef } from "react";
import styles from "../styles/LogoutModal.module.css";
import perfil from "../img/FotoUsuarioPerfil.png"

interface LogoutModalProps {
    onLogout: () => void;
    onCancel: () => void;
}

function LogoutModal({ onLogout, onCancel }: LogoutModalProps) {
    const modalRef = useRef<HTMLDivElement>(null); // Adiciona o tipo explícito para o useRef
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCancel();
        }
    };


    return (
        <div className={styles.modalBackground} onClick={handleBackgroundClick}>
            <div ref={modalRef} className={styles.logoutModalContainer}>
               <p className={styles.conta}>Conta</p>
            <div className={styles.informacoesPessoaisContainer}>
            <img src={perfil} alt="" />
            <div className={styles.informacoesPessoais}>
                <p>nome</p>
                <p>email</p>
            </div>
        </div>
        <hr />
        <p onClick={onLogout} className={styles.logout}>Fazer Logout</p>
        </div>
        </div>
  );
}

export default LogoutModal;
