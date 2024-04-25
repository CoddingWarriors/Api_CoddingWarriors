import styles from "../styles/Home.module.css"

function Card(props:any) {
    return (
        <div className={styles.containerCard}>
          <img src={props.imgSrc} alt={props.imgAlt} />
          <div>
            <h2 className={styles.textoImagemh1}> {props.titulo}</h2>
            <p className={styles.textoImagemp}>  {props.conteudo}</p>
          </div>
        </div>
    )
}

export default Card