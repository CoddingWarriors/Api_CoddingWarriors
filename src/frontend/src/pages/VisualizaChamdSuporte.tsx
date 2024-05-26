import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ChamadosArea from "../components/ChamadosArea"
import Tickets from "../components/Tickets"
import styleChamado from "../styles/Chamados.module.css"

function AtendimentoSuporte() {
    const [pendentes, setPendentes] = useState<any[]>([])
    const [emAndamento, setEmAndamento] = useState<any[]>([])
    const [concluidos, setConcluidos] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/")
            return
        }

        async function fetchUserType() {
            try {
                const response = await fetch("http://localhost:5000/usuariotipo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ token })
                })
        
                const data = await response.json()
        
                if (!response.ok) {
                    throw new Error(data.message)
                }
        
                console.log(data.tipoUsuario)
        
                if (data.tipoUsuario !== '2' && data.tipoUsuario !== '3') {
                    navigate("/")
                    return
                }
            } catch (error) {
                console.error("Error verifying user type:", error)
                navigate("/")
            }
        }
        

        async function fetchChamados(status: string) {
            try {
                const response = await fetch("http://localhost:5000/buscar-chamados-por-status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                })

                const data = await response.json()
                if (response.ok) {
                    return data
                } else {
                    throw new Error(data.message)
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

        fetchUserType().then(fetchAllChamados)
    }, [navigate])

    return (
        <div className={styleChamado.body}>
            <ChamadosArea className={styleChamado.tituloAzul} conteudoShow={styleChamado.conteudoShowAzul} titulo="Chamados pendentes">
                {pendentes.length === 0 &&
                    <div className={styleChamado.semChamado}>
                        <p>No momento não existem chamados pendentes</p>
                    </div>
                }
                {pendentes.map((chamado) => (
                    <Tickets
                        tipo={chamado.status}
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
                        tipo={chamado.status}
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
                        tipo=''
                        key={chamado.id_chamado}
                        ID={chamado.id_chamado}
                        Assunto={chamado.titulo}
                        Descricao={chamado.descricao}
                        Resposta={chamado.respostas}
                    />
                ))}
            </ChamadosArea>
        </div>
    )
}

export default AtendimentoSuporte
