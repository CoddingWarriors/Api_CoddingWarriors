// LogoutModal.tsx
import React from "react";
import styles from "../styles/LogoutModal.module.css";

interface LogoutModalProps {
    onLogout: () => void;
    onCancel: () => void;
}

function LogoutModal({ onLogout, onCancel }: LogoutModalProps) {
    return (
        <div className={styles.logoutModalContainer}>
            <p className={styles.logoutModalMessage}>Não é possivel visualizar o perfil na versão atual. Deseja sair?</p>
            <div className={styles.buttonContainer}>
                <button className={styles.logoutButton} onClick={onLogout}>Sair</button>
                <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
}

export default LogoutModal;
