import styles from "../styles/Atendimento.module.css"

function ImagemTextoAtendimento(props:any) {
    return (
        <div className={styles.containerImagemTexto}>
            <img src={props.imgSrc} alt={props.imgAlt} />
            <div>
                <h1>{props.titulo}</h1>
                <p>{props.subtitulo}</p>
                <button>{props.botao}</button>
            </div>
        </div>
    )
}

export default ImagemTextoAtendimento