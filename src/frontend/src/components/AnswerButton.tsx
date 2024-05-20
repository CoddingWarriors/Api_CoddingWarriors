import { Link } from "react-router-dom";
import styles from "../styles/Tickets.module.css"

interface AnswerButtonProps {
    onClick: () => void; // função que será acionada quando o botão for clicado
}

function AnswerButton({ onClick }: AnswerButtonProps) {
    return (
        <div className={styles.sectionThree}>
            <Link to="/responderchamado">
                <button className={styles.answerButton} onClick={onClick}>RESPONDER</button>
            </Link>
        </div>
    );
}

export default AnswerButton