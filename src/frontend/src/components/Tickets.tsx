import styles from "../styles/Tickets.module.css";
import image from '../img/viz.png';
import AnswerButton from './AnswerButton';
import AcceptAndDeleteButton from './AcceptAndDeleteButton';
import { Link } from "react-router-dom";

function Tickets(props: any) {
    return (
        <div className={styles.ticket}>
            <div className={styles.sectionOne}>
                <Link to={`/visualizarchamado/${props.ID}`}>
                    <img src={image} alt="Visualizar" className={styles.image} />
                    <p className={styles.text}><strong>Visualizar</strong></p>
                </Link>
            </div>
            <div className={styles.sectionTwoC}>
                <div className={styles.rectangle}>
                    <p><strong>ID:</strong> {props.ID}</p>
                </div>
                <div className={styles.rectangle}>
                    <p><strong>Título:</strong> {props.Assunto}</p>
                </div>
                <div className={styles.rectangle}>
                    <p><strong>Descrição:</strong> {props.Descricao}</p>
                </div>
                {props.Resposta && (
                    <div className={styles.rectangle}>
                        <p><strong>Resposta:</strong> {props.Resposta}</p>
                    </div>
                )}
                {props.TempoRestante && (
                    <div className={styles.rectangle}>
                        <p><strong>Tempo Restante:</strong> {props.TempoRestante}</p>
                    </div>
                )}
                {props.DataFinalizacao && (
                    <div className={styles.rectangle}>
                        <p><strong>Data de Finalização:</strong> {props.DataFinalizacao}</p>
                    </div>
                )}
            </div>
            {props.tipo === 'Aberto' && <AcceptAndDeleteButton chamadoId={props.ID} />}
            {props.tipo === 'Em andamento' && <AnswerButton chamadoId={props.ID} onClick={props.onClick} />}
        </div>
    );
}

export default Tickets;
