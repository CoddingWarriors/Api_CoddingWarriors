import card from "../img/card-home.png"
import empresa from "../img/sobre-empresa.png"
import pensativa from "../img/pensativa.png"
import styles from "../styles/Home.module.css"
import style from "../styles/Motivos.module.css"

import Card from "../components/Card"
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

            <div className={styles.containerImagemTexto}>
                <img src={empresa} alt="Sobre empresa não carregou" />
                    <div className={styles.sobreEmpresa}>
                        <h1><strong>Nossa empresa tem grande destaque no mercado!</strong></h1>
                        <p>Com anos de experiência e uma equipe apaixonada, somos reconhecidos por  nossa inovação, confiabilidade e compromisso com a satisfação do  cliente</p>
                    </div>
            </div>

            <h1 className={styles.motivosTitulo}>Porque escolher a Internet Ocean?</h1>
            <div className={styles.containerMotivos}>
                <img className={styles.pensativa} src={pensativa} alt="" />
                <div className={styles.containerMotivosCard}>
                    <Motivos 
                        className={style.containerAzulEscuro}
                        titulo="Velocidade"
                        conteudo="Na internet Ocean a sua conexão é nossa prioridade!"
                    />

                    <Motivos
                        className={style.containerAzulPrimario}
                        titulo="Tecnologia"
                        conteudo="Temos uma tecnologia de ponta a ponta, desde a rua até a sua casa!"
                    />

                    <Motivos
                        className={style.containerAzulClaro}
                        titulo="Suporte"
                        conteudo="Nossa equipe está sempre trabalhando com foco para ajudar você!"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home