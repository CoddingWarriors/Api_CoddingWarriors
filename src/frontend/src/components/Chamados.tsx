import { useState } from "react"
import styles from "../styles/Chamados.module.css"
import setaCimaBranca from "../img/setaCimaBranca.png"
import setaBaixoBranca from "../img/setaBaixoBranca.png"

function Chamados(props: any) {
    const [selecionado, setSelecionado] = useState<boolean | null>(null)

    const toggle = () => {
        setSelecionado(!selecionado)
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.accordion}>
                    <div className={styles.chamado}>
                        <div className={props.className} onClick={toggle}>
                            <h2>{props.titulo}</h2>
                            <span>
                                {selecionado ? (
                                    <img src={setaCimaBranca} alt="-" />
                                ) : (
                                    <img src={setaBaixoBranca} alt="+" />
                                )}
                            </span>
                        </div>
                        <div className={selecionado ? styles.conteudoShow : styles.conteudo}>
                            <div className={styles.conteudoChamado}>{props.children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chamados
