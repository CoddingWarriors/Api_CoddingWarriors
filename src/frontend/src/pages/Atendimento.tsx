import card from "../img/card-atendimento.png"
import atendente from "../img/atendente.png"
import Card from "../components/Card"
import Chamados from "../components/Chamados"
import styles from "../styles/Atendimento.module.css"
import styleChamado from "../styles/Chamados.module.css"
import { useState } from "react"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
import realizarLogin from "../img/realizarLogin.png"

function Atendimento() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/login');
    };

    const [openModal, setOpenModal] = useState(false)

    return (
        <div>
            <Card 
                imgSrc={card}
                imgAlt="Não carregou o card"
                titulo="Na empresa Internet Ocean você sempre pode confiar!"
                conteudo="Caso tenha encontrado alguma dificuldade na utilização dos nossos serviços, solicite atendimento abaixo"
            />

            <div className={styles.containerImagemTexto}>
                <img src={atendente} alt="Não carregou o atendente" />
                     <div>
                        <h1>Precisa de ajuda?</h1>
                        <p>Nossa equipe está sempre disposta a ajudar! Para solicitar assistência técnica especializada, por favor, clique no botão abaixo.</p>
                        <button className={styles.abrirChamado} onClick={() => setOpenModal(true)}>Abrir chamado</button>
                        <Modal isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)}>
                            <div className={styles.containerModal}>
                                <img src={realizarLogin} alt="" />
                                <h2>Para prosseguir com a abertura do chamado, por favor, realize o login</h2>
                                <button onClick={handleClick}>Login</button>
                            </div>
                        </Modal>
                    </div>
            </div>

            <h1 className={styles.titulo}>Já abriu o seu chamado?</h1>
            <p className={styles.conteudo}>Caso você já tenha aberto um chamado conosco, saiba que a nossa equipe de suporte está dedicada a atender suas necessidades e resolver sua solicitação da melhor maneira possível <br /> 
            Para verificar o status atual da sua solicitação, confira abaixo o seu status. Agradecemos sua paciência e confiança em nossos serviços.</p>
            
            <Chamados
                className={styleChamado.tituloAzul}
                titulo="Chamados pendentes"
                conteudo="No momento não existem chamados pendentes"
            />

            <Chamados
                className={styleChamado.tituloLaranja}
                titulo="Chamados em andamento"
                conteudo="No momento não existem chamados em andamento"
            />

            <Chamados
                className={styleChamado.tituloVerde}
                titulo="Chamados concluídos"
                conteudo="No momento não existem chamados concluídos"
            />
        </div>
    )
}

export default Atendimento