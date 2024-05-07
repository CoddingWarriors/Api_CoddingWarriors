import card from "../img/card-atendimento.png"
import atendente from "../img/atendente.png"
import Card from "../components/Card"
import Chamados from "../components/Chamados"
import styles from "../styles/Atendimento.module.css"
import styleChamado from "../styles/Chamados.module.css"
import { useState, useEffect } from "react"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
import realizarLogin from "../img/realizarLogin.png"
import TicketsC from "../components/TicketsC"

function Atendimento() {
    const [pendentes, setPendentes] = useState<any[]>([])
    const [emAndamento, setEmAndamento] = useState<any[]>([])
    const [concluidos, setConcluidos] = useState<any[]>([])
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        async function fetchChamados(status: string) {
            try {
                const token = localStorage.getItem("token")

                if (token) {
                    const tokenPayload = token.split(".")[1]
                    const decodedPayload = atob(tokenPayload)
                    const payloadObj = JSON.parse(decodedPayload)
                    const userId = payloadObj.id_usuario
                    const response = await fetch("http://localhost:5000/buscar-chamados-por-status", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ status }),
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
            <Chamados className={styleChamado.tituloAzul} titulo="Chamados pendentes">
                {pendentes.map((chamado) => (
                    <TicketsC
                        key={chamado.id_chamado}
                        ID={chamado.id_chamado}
                        Assunto={chamado.titulo}
                        Descricao={chamado.descricao}
                    />
                ))}
            </Chamados>
            <Chamados className={styleChamado.tituloLaranja} titulo="Chamados em andamento">
                {emAndamento.map((chamado) => (
                    <TicketsC
                        key={chamado.id_chamado}
                        ID={chamado.id_chamado}
                        Assunto={chamado.titulo}
                        Descricao={chamado.descricao}
                    />
                ))}
            </Chamados>

            <Chamados className={styleChamado.tituloVerde} titulo="Chamados concluídos">
                {concluidos.map((chamado) => (
                    <TicketsC
                        key={chamado.id_chamado}
                        ID={chamado.id_chamado}
                        Assunto={chamado.titulo}
                        Descricao={chamado.descricao}
                    />
                ))}
            </Chamados>
        </div>
    )
}

export default Atendimento
