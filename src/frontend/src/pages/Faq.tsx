import PerguntasFaq from "../components/PerguntasFaq"
import styles from "../styles/Faq.module.css"
import { useState } from "react"


function Faq() {
    const [selecionado, setSelecionado] = useState(null)

    const toggle = (i:any) => {
        if(selecionado === i) {
            return setSelecionado(null)
        }

        setSelecionado(i)
    }

    return (
        <div>
            <form action="">
                <div className={styles.filtro}>
                    <input type="radio" name="" id="" />
                    <label htmlFor="">Velocidade de internet baixa</label>
                </div>
                
                <div className={styles.filtro}>
                    <input type="radio" name="" id="" />
                    <label htmlFor="">Internet instável</label>
                </div>
                
                <div className={styles.filtro}>
                    <input type="radio" name="" id="" />
                    <label htmlFor="">Sem conexão de internet</label>
                </div>
            </form>

            <div className={styles.wrapper}>
                <div className={styles.accordion}>
                    {PerguntasFaq.map((item, i) => (
                        <div className={styles.item}>
                            <div className={styles.titulo} onClick={() => toggle(i)}>
                                <h3>{item.pergunta}</h3>
                                <span>{selecionado === i ? "-" : "+" }</span>
                            </div>
                            <div className={selecionado === i ? styles.conteudoShow : styles.conteudo}>{item.resposta}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Faq