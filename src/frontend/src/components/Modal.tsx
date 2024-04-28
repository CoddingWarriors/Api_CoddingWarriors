import React from "react";
import styles from "../styles/Modal.module.css"

function Modal({isOpen, setOpenModal, children}: {isOpen:any; setOpenModal:any; children: React.ReactNode}) {
    if (isOpen) {
        return (
            <div className={styles.backgroud}>
                <div className={styles.modal}>
                    <button className={styles.x} onClick={setOpenModal}>X</button>
                    <div>{children}</div>
                </div>
            </div>
        )
    }

    return null
}

export default Modal