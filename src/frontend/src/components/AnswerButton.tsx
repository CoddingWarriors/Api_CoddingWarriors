import { Link } from "react-router-dom";
import styles from "../styles/Tickets.module.css";

interface AnswerButtonProps {
    chamadoId: string; // Adiciona a prop chamadoId
    onClick: () => void; // Função que será acionada quando o botão for clicado
}

function AnswerButton({ chamadoId, onClick }: AnswerButtonProps) {
    return (
        <div className={styles.sectionThree}>
            <Link to={`/responderchamado/${chamadoId}`}>
                <button className={styles.answerButton} onClick={onClick}>RESPONDER</button>
            </Link>
        </div>
    );
}

export default AnswerButton;
