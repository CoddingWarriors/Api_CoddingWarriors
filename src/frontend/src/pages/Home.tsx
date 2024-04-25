import card from "../img/card-home.png"
import empresa from "../img/sobre-empresa.png"
import pensativa from "../img/pensativa.png"
import styles from "../styles/Home.module.css"

import Card from "../components/Card"
import ImagemTexto from "../components/ImagemTexto"
import Motivos from "../components/Motivos"

function Home() {
    return (
        <div>
            <Card
                imgSrc={card}
                imgAlt="Imagem não carregou" 
                titulo="Seja bem-vindo à Empresa Internet Ocean"
                conteudo="Sua parceira confiável para soluções inovadoras e serviços de alta qualidade!"
            />

            <ImagemTexto
                imgSrc={empresa}
                imgAlt="Sobre empresa não carregou"
                titulo="Nossa empresa tem grande destaque no mercado!"
                subtitulo="Com anos de experiência e uma equipe apaixonada, somos reconhecidos por  nossa inovação, confiabilidade e compromisso com a satisfação do  cliente"
            
            />

            <h1 className={styles.motivosTitulo}>Porque escolher a Internet Ocean?</h1>
            <div className={styles.containerMotivos}>
                <img className={styles.pensativa} src={pensativa} alt="" />
                <div className={styles.containerMotivosCard}>
                    <Motivos 
                        titulo="Velocidade"
                        conteudo="Na internet Ocean a sua conexão é nossa prioridade!"
                    />

                    <Motivos
                        titulo="Tecnologia"
                        conteudo="Temos uma tecnologia de ponta a ponta, desde a rua até a sua casa!"
                    />

                    <Motivos
                        titulo="Suporte"
                        conteudo="Nossa equipe está sempre trabalhando com foco para ajudar você!"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home