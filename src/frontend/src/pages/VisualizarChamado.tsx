import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "../styles/VisualizarChamado.module.css"

function VisualizarChamado() {
    const { chamadoId } = useParams()
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userType, setUserType] = useState<number | null>(null)
    const [chamado, setChamado] = useState<{
        titulo: string
        descricao: string
        categoria: string
        imagem: string
        status: string
        respostas: string
        dataCriacao: null | string
        dataFinalizacao: null | string
        tempoDecorrido: string
    }>({
        titulo: "",
        descricao: "",
        categoria: "",
        imagem: "",
        status: "",
        respostas: "",
        dataCriacao: null,
        dataFinalizacao: null,
        tempoDecorrido: "Tempo desconhecido",
    })

    const [tempoRestante, setTempoRestante] = useState<string>("")
    const [editableDataFinalizacao, setEditableDataFinalizacao] = useState<string | null>(null)
    const [isEditingDataFinalizacao, setIsEditingDataFinalizacao] = useState(false)

    const calcularTempoDecorrido = () => {
        if (!chamado.dataCriacao) {
            return "Tempo desconhecido"
        }

        let dataFinal
        if (chamado.status === "Concluído" && chamado.dataFinalizacao) {
            dataFinal = new Date(chamado.dataFinalizacao)
        } else {
            dataFinal = new Date()
        }

        const diffMs = dataFinal.getTime() - new Date(chamado.dataCriacao).getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

        return `${diffHours} horas decorridas`
    }

    const calcularTempoRestante = () => {
        if (!chamado.dataFinalizacao) {
            return "Tempo desconhecido"
        }

        const dataFinalizacao = new Date(chamado.dataFinalizacao)
        const agora = new Date()

        if (dataFinalizacao < agora) {
            return "Tempo expirado"
        }

        const diffMs = dataFinalizacao.getTime() - agora.getTime()
        const diffSeconds = Math.floor(diffMs / 1000)

        const hours = Math.floor(diffSeconds / 3600)
        const minutes = Math.floor((diffSeconds % 3600) / 60)
        const seconds = diffSeconds % 60

        return `${hours}h ${minutes}m ${seconds}s`
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
            fetchUserType(token)
        }
    }, [])

    const fetchUserType = async (token: any) => {
        try {
            const response = await fetch("http://localhost:5000/usuariotipo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ token }),
            })

            if (response.ok) {
                const data = await response.json()
                setUserType(data.tipoUsuario)
            } else {
                console.error("Erro ao obter o tipo de usuário")
            }
        } catch (error) {
            console.error("Erro ao verificar o tipo de usuário:", error)
        }
    }

    useEffect(() => {
        async function fetchChamado() {
            try {
                const response = await fetch("http://localhost:5000/obter-informacoes-chamado", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ chamadoId }),
                })

                if (!response.ok) {
                    throw new Error("Erro ao obter informações do chamado")
                }

                const dadosChamado = await response.json()
                setChamado(dadosChamado)
                setEditableDataFinalizacao(dadosChamado.dataFinalizacao)

                if (dadosChamado.status !== "Concluído") {
                    setTempoRestante(calcularTempoRestante())
                }
            } catch (error) {
                console.error("Erro ao obter informações do chamado:", error)
            }
        }

        fetchChamado()
    }, [chamadoId])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTempoRestante(calcularTempoRestante())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [chamado.dataFinalizacao])

    const handleSaveDataFinalizacao = async () => {
        try {
            const token = localStorage.getItem("token")
            if (token && editableDataFinalizacao) {
                const response = await fetch("http://localhost:5000/atualizar-data-finalizacao", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ chamadoId, novaDataFinalizacao: editableDataFinalizacao }),
                })

                if (response.ok) {
                    setChamado((prevChamado) => ({
                        ...prevChamado,
                        dataFinalizacao: editableDataFinalizacao,
                    }))
                    setIsEditingDataFinalizacao(false)
                } else {
                    console.error("Erro ao atualizar data de finalização:", response.status)
                }
            } else {
                console.error("editableDataFinalizacao está undefined ou vazio")
            }
        } catch (error) {
            console.error("Erro ao atualizar data de finalização:", error)
        }
    }

    const formatarData = (dataString: any) => {
        const data = new Date(dataString)
        const dia = String(data.getDate()).padStart(2, "0")
        const mes = String(data.getMonth() + 1).padStart(2, "0")
        const ano = data.getFullYear()
        const horas = String(data.getHours()).padStart(2, "0")
        const minutos = String(data.getMinutes()).padStart(2, "0")
        const segundos = String(data.getSeconds()).padStart(2, "0")
        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`
    }

    return (
        <div className={styles.containerAbrirChamado}>
            {chamado.status === "Aberto" && <h1 className={styles.titulo}>Chamado pendente</h1>}
            {chamado.status === "Em andamento" && <h1 className={styles.titulo}>Chamado em andamento</h1>}
            {chamado.status === "Concluído" && <h1 className={styles.titulo}>Chamado concluído</h1>}
            <p className={styles.labelText}>Título</p>
            <p className={styles.inputTitulo}>{chamado.titulo}</p>

            <p className={styles.labelText}>Descrição</p>
            <p className={styles.textareaDescricao}>{chamado.descricao}</p>

            <h2 className={styles.categoriasTitulo}>
                Categoria:<span className={styles.categoria}>{chamado.categoria}</span>
            </h2>

            {chamado.imagem && (
                <div className={styles.containerImagem}>
                    <p>Imagem enviada</p>
                    <img src={chamado.imagem} alt="Imagem do chamado" className={styles.imagemChamado} />
                </div>
            )}
            {chamado.status === "Concluído" && (
                <div>
                    <p className={styles.respostaTitulo}>Resposta</p>
                    <p className={styles.resposta}>{chamado.respostas}</p>
                </div>
            )}

            {(chamado.status === "Aberto" || chamado.status === "Em andamento") && (
                <div>
                    <p className={styles.labelText}>Tempo restante:</p>
                    <p className={styles.tempo}>{tempoRestante}</p>
                </div>
            )}

            {(userType == 2 || userType === 3) && (
                <div className={styles.editDataContainer}>
                    {isEditingDataFinalizacao ? (
                        <div className={styles.editableData}>
                            <p className={styles.labelText}>Data de Finalização:</p>
                            <input
                                type="datetime-local"
                                value={editableDataFinalizacao || ""}
                                onChange={(e) => setEditableDataFinalizacao(e.target.value)}
                                className={styles.inputDataFinalizacao}
                            />
                            <button onClick={handleSaveDataFinalizacao} className={styles.salvar}>
                                Salvar
                            </button>
                        </div>
                    ) : (
                        <div className={styles.nonEditableData}>
                            <p className={styles.labelText}>Data de Finalização:</p>
                            <p>{chamado.dataFinalizacao ? formatarData(chamado.dataFinalizacao) : "N/A"}</p>
                            <button
                                onClick={() => setIsEditingDataFinalizacao(true)}
                                className={styles.editar}
                            >
                                Editar
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.botoes}>
                <button type="button" className={styles.voltar} onClick={() => navigate(-1)}>
                    Voltar
                </button>
            </div>
        </div>
    )
}

export default VisualizarChamado
