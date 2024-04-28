import { useState } from "react"
import styles from "../styles/Chamados.module.css"


function Chamados(props:any) {
const [selecionado, setSelecionado] = useState<boolean | null>(null)

    const toggle = () => {
        setSelecionado(!selecionado)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.accordion}>
                <div className={styles.chamado}>
                    <div className={props.className} onClick={toggle}>
                        <h2>{props.titulo}</h2>
                        <span>{selecionado ?
                            <img src="../img/setaCimaBranca.png" alt="-" />
                            : (
                            <img src="../img/setaBaixoBranca.png" alt="+" />
                        )}</span>
                    </div>
                    <div className={selecionado ? styles.conteudoShow : styles.conteudo}>
                        <div className={styles.conteudoChamado}>
                            {props.conteudo}
                        </div>
                    </div>
                </div>
        </div>
    </div>
)}

export default Chamados