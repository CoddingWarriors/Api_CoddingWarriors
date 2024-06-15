import styles from "../styles/FaqComponente.module.css";
import EditAndDeleteButtonFaq from "./EditAndDeleteButtonFaq";

function Faq(props: any) {
    return (
        <div className={styles.faq}>
            <div className={styles.sectionTwoC}>
                <div className={styles.pergunta}>
                    <p><strong>Pergunta:</strong> {props.ID}</p>
                </div>
                <div className={styles.resposta}>
                    <p><strong>Resposta:</strong> {props.Assunto}</p>
                </div>
            </div>
            <EditAndDeleteButtonFaq faqId={props.ID} />
        </div>
    );
}

export default Faq;
