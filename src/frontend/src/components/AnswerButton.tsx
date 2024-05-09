import styles from "../styles/Tickets.module.css"

interface AnswerButtonProps {
    onClick: () => void; // função que será acionada quando o botão for clicado
}

function AnswerButton({ onClick }: AnswerButtonProps) {
    return (
        <div className={styles.sectionThree}>
            <button className={styles.answerButton} onClick={onClick}>RESPONDER</button>
        </div>
    );
}

export default AnswerButton