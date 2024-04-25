import card from "../img/card-atendimento.png"
import atendente from "../img/atendente.png"
import Card from "../components/Card"
import ImagemTextoAtendimento from "../components/ImagemTextoAtendimento"
import Chamados from "../components/Chamados"
import styles from "../styles/Atendimento.module.css" 

function Atendimento() {
    return (
        <div>
            <Card 
                imgSrc={card}
                imgAlt="Não carregou o card"
                titulo="Na empresa Internet Ocean você sempre pode confiar!"
                conteudo="Caso tenha encontrado alguma dificuldade na utilização dos nossos serviços, solicite atendimento abaixo"
            />

            <ImagemTextoAtendimento
                imgSrc={atendente}
                imgAlt="Não carregou o atendente"
                titulo="Precisa de ajuda?"
                subtitulo="Nossa equipe está sempre disposta a ajudar! Para solicitar assistência técnica especializada, por favor, clique no botão abaixo."
                botao="Abir chamado"
            />

            <h1 className={styles.titulo}>Já abriu o seu chamado?</h1>
            <p className={styles.conteudo}>Caso você já tenha aberto um chamado conosco, saiba que a nossa equipe de suporte está dedicada a atender suas necessidades e resolver sua solicitação da melhor maneira possível <br /> 
            Para verificar o status atual da sua solicitação, confira abaixo o seu status. Agradecemos sua paciência e confiança em nossos serviços.</p>
            
            <Chamados 
                titulo="Chamados pendentes"
                conteudo="No momento não existem chamados pendentes"
            />

            <Chamados
                titulo="Chamados em andamento"
                conteudo="No momento não existem chamados em andamento"
            />

            <Chamados
                titulo="Chamados concluídos"
                conteudo="No momento não existem chamados concluídos"
            />

        </div>
    )
}

export default Atendimento