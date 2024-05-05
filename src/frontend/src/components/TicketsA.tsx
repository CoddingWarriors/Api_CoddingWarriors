import styles from "../styles/Tickets.module.css"
import image from '../img/viz.png';

function TicketsA(props:any) {
    return (
        <div className={styles.ticket}>
            <div className={styles.sectionOne}>
                <a href={props.link}>
                    <img src={image} alt="Visualizar" className={styles.image} />
                    <p className={styles.text}><strong>Visualizar</strong></p>
                </a>
            </div>
            <div className={styles.sectionTwo}>
                <div className={styles.rectangle}>
                    <p><strong>ID:</strong> {props.ID}</p>
                </div>
                <div className={styles.rectangle}>
                    <p><strong>Assunto:</strong> {props.Assunto}</p>
                </div>
                <div className={styles.rectangle}>
                    <p><strong>Descrição:</strong> {props.Descricao}</p>
                </div>
            </div>
            <div className={styles.sectionThree}>
                <button className={styles.answerButton}>RESPONDER</button>
            </div>
        </div>
    );
}

export default TicketsA