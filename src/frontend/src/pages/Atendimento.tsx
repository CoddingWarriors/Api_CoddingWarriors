import card from "../img/card-atendimento.png"
import atendente from "../img/atendente.png"
import Card from "../components/Card"
import ChamadosArea from "../components/ChamadosArea"
import styles from "../styles/Atendimento.module.css"
import styleChamado from "../styles/Chamados.module.css"
import { useState, useEffect } from "react"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
import realizarLogin from "../img/realizarLogin.png"
import Tickets from "../components/Tickets"

function Atendimento() {
    const [pendentes, setPendentes] = useState<any[]>([])
    const [emAndamento, setEmAndamento] = useState<any[]>([])
    const [concluidos, setConcluidos] = useState<any[]>([])
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)

    const handleClick = async () => {
        const response = await fetch("http://localhost:5000/verificar-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        console.log(localStorage.getItem("token"))

        if (response.ok) {
            navigate("/abrirchamado")
        } else {
            setOpenModal(true)
        }
    }

    useEffect(() => {
        async function fetchChamados(status: string) {
            try {
                const token = localStorage.getItem("token")

                if (token) {
                    const response = await fetch("http://localhost:5000/buscar-chamados", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ token, status }),
                    })

                    const data = await response.json()
                    console.log(data)

                    if (response.ok) {
                        return data
                    } else {
                        throw new Error(data.message)
                    }
                } else {
                    throw new Error("Token not found")
                }
            } catch (error) {
                console.error("Error fetching chamados:", error)
                return []
            }
        }

        async function fetchAllChamados() {
            try {
                const pendentesData = await fetchChamados("Aberto")
                const emAndamentoData = await fetchChamados("Em andamento")
                const concluidosData = await fetchChamados("Concluido")

                setPendentes(pendentesData)
                setEmAndamento(emAndamentoData)
                setConcluidos(concluidosData)
            } catch (error) {
                console.error("Error fetching all chamados:", error)
            }
        }

        fetchAllChamados()
    }, [])

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
                    <p>
                        Nossa equipe está sempre disposta a ajudar! Para solicitar assistência técnica
                        especializada, por favor, clique no botão abaixo.
                    </p>
                    <button className={styles.abrirChamado} onClick={handleClick}>
                        Abrir chamado
                    </button>
                    <Modal isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)}>
                        <div className={styles.containerModal}>
                            <img src={realizarLogin} alt="" />
                            <h2>Para prosseguir com a abertura do chamado, por favor, realize o login</h2>
                            <button onClick={() => navigate("/login")}>Login</button>
                        </div>
                    </Modal>
                </div>
            </div>

            {localStorage.getItem("token") && (
                <>
                    <h1 className={styles.titulo}>Já abriu o seu chamado?</h1>
                    <p className={styles.conteudo}>
                        Caso você já tenha aberto um chamado conosco, saiba que a nossa equipe de suporte está
                        dedicada a atender suas necessidades e resolver sua solicitação da melhor maneira possível{" "}
                        <br />
                        Para verificar o status atual da sua solicitação, confira abaixo o seu status. Agradecemos sua
                        paciência e confiança em nossos serviços.
                    </p>

                    <ChamadosArea className={styleChamado.tituloAzul} conteudoShow={styleChamado.conteudoShowAzul} titulo="Chamados pendentes">
                    {pendentes.length === 0 &&
                            <div className={styleChamado.semChamado}>
                                <p>No momento não existem chamados pendentes</p>
                            </div>
                        }
                        {pendentes.map((chamado) => (
                            <Tickets
                                key={chamado.id_chamado}
                                ID={chamado.id_chamado}
                                Assunto={chamado.titulo}
                                Descricao={chamado.descricao}
                            />
                        ))}
                    </ChamadosArea>
                    <ChamadosArea className={styleChamado.tituloLaranja} conteudoShow={styleChamado.conteudoShowLaranja} titulo="Chamados em andamento">
                        {emAndamento.length === 0 &&
                            <div className={styleChamado.semChamado}>
                                <p>No momento não existem chamados em andamento</p>
                            </div>
                        }
                        {emAndamento.map((chamado) => (
                            <Tickets
                                key={chamado.id_chamado}
                                ID={chamado.id_chamado}
                                Assunto={chamado.titulo}
                                Descricao={chamado.descricao}
                            />
                        ))}
                    </ChamadosArea>

                    <ChamadosArea className={styleChamado.tituloVerde} conteudoShow={styleChamado.conteudoShowVerde} titulo="Chamados concluídos">
                        {concluidos.length === 0 &&
                            <div className={styleChamado.semChamado}>
                                <p>No momento não existem chamados concluídos</p>
                            </div>
                        }
                        {concluidos.map((chamado) => (
                            <Tickets
                                key={chamado.id_chamado}
                                ID={chamado.id_chamado}
                                Assunto={chamado.titulo}
                                Descricao={chamado.descricao}
                                Resposta={chamado.respostas}
                            />
                        ))}
                    </ChamadosArea>
                </>
                )}
        </div>
    )
}

export default Atendimento
