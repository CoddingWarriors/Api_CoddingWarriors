import styles from "../styles/FaqComponente.module.css";
import EditAndDeleteButtonFaq from "./EditAndDeleteButtonFaq";

function Faq(props: { id_faq: number, pergunta: string, resposta: string }) {
    return (
        <div className={styles.faq}>
            <div className={styles.sectionTwoC}>
                <div className={styles.pergunta}>
                    <p><strong>Pergunta:</strong> {props.pergunta}</p>
                </div>
                <div className={styles.resposta}>
                    <p><strong>Resposta:</strong> {props.resposta}</p>
                </div>
            </div>
            <EditAndDeleteButtonFaq faqId={props.id_faq} />
        </div>
    );
}

export default Faq;