import styles from "../styles/Home.module.css"

function Motivos(props:any) {
    return (
        <div className={styles.containerMotivo}>
            <h1 className={styles.tituloMotivos}>{props.titulo}</h1>
            <p className={styles.conteudoMotivos}>{props.conteudo}</p>
        </div>
    )
}

export default Motivos