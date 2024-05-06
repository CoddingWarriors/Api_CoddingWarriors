import styles from "../styles/Faq.module.css"
import setaBaixo from "../img/setaBaixo.png"
import setaCima from "../img/setaCima.png"
import { useState } from "react"


function Faq() {
    const PerguntasFaq = [
        {
            pergunta: "Por que minha conexão de internet está lenta?",
            resposta: "Se sua conexão de internet está lenta, tente reiniciar o modem e o roteador, fechar aplicativos que consomem muita largura de banda e verificar se há downloads ou uploads em segundo plano."
        },
        {
            pergunta: "Como posso melhorar o sinal Wi-Fi em minha casa?",
            resposta: "Para melhorar o sinal Wi-Fi em sua casa, posicione o roteador em um local central, longe de interferências, como dispositivos eletrônicos e paredes grossas, e considere usar um extensor de alcance Wi-Fi."
        },
        {
            pergunta: "O que devo fazer se minha internet estiver intermitente?",
            resposta: "Se sua internet estiver intermitente, verifique se há cabos soltos ou danificados, reinicie o modem e o roteador e entre em contato com seu provedor de serviços de internet para verificar se há problemas de conexão."
        },
        {
            pergunta: "O que fazer se minha conexão de internet estiver caindo com frequência?",
            resposta: "Se sua conexão de internet estiver caindo com frequência, verifique se há interferências de dispositivos eletrônicos próximos, reinicie o modem e o roteador e entre em contato com seu provedor de serviços de internet para verificar problemas de conexão."
        }
    ]

    const [selecionado, setSelecionado] = useState(null)

    const toggle = (i:any) => {
        if(selecionado === i) {
            return setSelecionado(null)
        }

        setSelecionado(i)
    }

    return (
        <div className={styles.containerFAQ}>
            <h1>Perguntas Frequentes (FAQ)</h1>
            <p>Bem-vindo à nossa seção de Perguntas Frequentes (FAQ)! Aqui você encontrará respostas para as perguntas mais comuns sobre nossos produtos/serviços. <br /> 
            Nosso objetivo é oferecer a você uma experiência tranquila e satisfatória, fornecendo informações claras e abrangentes para ajudar a resolver suas dúvidas de maneira rápida e eficiente.</p>
            <div className={styles.wrapper}>
                <div className={styles.accordion}>
                    {PerguntasFaq.map((item, i) => (
                        <div className={styles.item}>
                            <div className={styles.titulo} onClick={() => toggle(i)}>
                                <h3>{item.pergunta}</h3>
                                <span>{selecionado === i ? 
                                <img src={setaCima} alt="-" /> 
                                :
                                <img src={setaBaixo} alt="-" /> }</span>
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