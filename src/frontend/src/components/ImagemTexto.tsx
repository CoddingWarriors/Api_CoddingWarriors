import styles from "../styles/Home.module.css"

function ImagemTexto(props:any) {
    return (
        <div className={styles.containerImagemTexto}>
            <img src={props.imgSrc} alt={props.imgAlt} />
            <div>
                <h1>{props.titulo}</h1>
                <p>{props.subtitulo}</p>
            </div>
        </div>
    )
}

export default ImagemTexto