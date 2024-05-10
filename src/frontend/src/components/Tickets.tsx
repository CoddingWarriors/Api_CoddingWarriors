import styles from "../styles/Tickets.module.css"
import image from '../img/viz.png';
import AnswerButton from './AnswerButton';
import AcceptAndDeleteButton from './AcceptAndDeleteButton';

function Tickets(props:any) {
    return (
        <div className={styles.ticket}>
            <div className={styles.sectionOne}>
                <a href={props.link}>
                    <img src={image} alt="Visualizar" className={styles.image} />
                    <p className={styles.text}><strong>Visualizar</strong></p>
                </a>
            </div>
            <div className={styles.sectionTwoC}>
                <div className={styles.rectangle}>
                    <p><strong>ID:</strong> {props.ID}</p>
                </div>
                <div className={styles.rectangle}>
                    <p><strong>Titulo:</strong> {props.Assunto}</p>
                </div>
                <div className={styles.rectangle}>
                    <p><strong>Descrição:</strong> {props.Descricao}</p>
                </div>
            </div>
            <></>
            {/* espaço para os Componentes Botões!!! */}
            {props.tipo === 'Aberto' && <AcceptAndDeleteButton onAccept={props.onAccept} onDelete={props.onDelete} />}
            {props.tipo === 'Em andamento' && <AnswerButton onClick={props.onClick} />}
        </div>
    );
}

export default Tickets