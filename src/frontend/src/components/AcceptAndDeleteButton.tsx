import styles from "../styles/Tickets.module.css"

interface AcceptAndDeleteButtonProps {
    onAccept: () => void; // função que será acionada quando o botão "ACEITAR" for clicado
    onDelete: () => void; // função que será acionada quando o botão "DELETAR" for clicado
}

function AcceptAndDeleteButton({ onAccept, onDelete }: AcceptAndDeleteButtonProps) {
    return (
        <div className={styles.sectionThree}>
            <button className={styles.acceptButton} onClick={onAccept}>ACEITAR</button>
            <button className={styles.deleteButton} onClick={onDelete}>DELETAR</button>
        </div>
    );
}

export default AcceptAndDeleteButton