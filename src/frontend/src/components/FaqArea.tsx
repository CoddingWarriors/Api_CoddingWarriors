import styles from "../styles/VisualizarFaq.module.css";

function FaqArea(props: any) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.accordion}>
                <div className={styles.equipamento}>
                    <div className={styles.conteudo}>
                        <div className={styles.conteudoEquipamento}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FaqArea;