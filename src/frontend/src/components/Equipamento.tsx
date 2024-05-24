import styles from "../styles/Equipamento.module.css";
import AlterAndDeleteEquipamento from "./AlterAndDeleteEquipamento";

function Equipamento(props: any) {
    const dataInstalacao = new Date(props.Data);
    const dataFormatada = `${dataInstalacao.getDate()}/${dataInstalacao.getMonth() + 1}/${dataInstalacao.getFullYear()}`;

    return (
        <div className={styles.equipamento}>
            <div className={styles.infoContainer}>
                <div className={styles.section}>
                    <p className={styles.text}><strong>ID:</strong> {props.id_equipamento}</p>
                    <p className={styles.text}><strong>Data de instalação:</strong> {dataFormatada}</p>
                    <p className={styles.text}><strong>Notas:</strong> {props.Notas}</p>
                </div>
                <div className={styles.section}>
                    <p className={styles.text}><strong>Tipo:</strong> {props.Tipo}</p>
                    <p className={styles.text}><strong>Localização:</strong> {props.Localizacao}</p>
                </div>
                <div className={styles.section}>
                    <p className={styles.text}><strong>Endereço IP:</strong> {props.IP}</p>
                </div>
                <div className={`${styles.section} ${styles.section4}`}>
                    <p className={`${styles.text} ${styles.statusText}`}><strong>Status:</strong> {props.Status}</p>
                    <AlterAndDeleteEquipamento id_equipamento={props.id_equipamento} />
                </div>
            </div>
        </div>
    );
}

export default Equipamento;