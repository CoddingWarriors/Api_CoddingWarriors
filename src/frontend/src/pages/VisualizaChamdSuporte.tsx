import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChamadosArea from "../components/ChamadosArea";
import Tickets from "../components/Tickets";
import styleChamado from "../styles/Chamados.module.css";

function AtendimentoSuporte() {
    const [pendentes, setPendentes] = useState<any[]>([]);
    const [emAndamento, setEmAndamento] = useState<any[]>([]);
    const [concluidos, setConcluidos] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
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
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                if (data.tipoUsuario !== '2' && data.tipoUsuario !== '3') {
                    navigate("/");
                    return;
                }
            } catch (error) {
                console.error("Error verifying user type:", error);
                navigate("/");
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
                });

                const data = await response.json();
                if (response.ok) {
                    return data;
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error("Error fetching chamados:", error);
                return [];
            }
        }

        async function fetchAllChamados() {
            try {
                const pendentesData = await fetchChamados("Aberto");
                const emAndamentoData = await fetchChamados("Em andamento");
                const concluidosData = await fetchChamados("Concluido");

                setPendentes(pendentesData);
                setEmAndamento(emAndamentoData);
                setConcluidos(concluidosData);
            } catch (error) {
                console.error("Error fetching all chamados:", error);
            }
        }

        fetchUserType().then(fetchAllChamados);
    }, [navigate]);

    const calcularTempoRestante = (dataFinalizacao: string | number | Date) => {
        if (!dataFinalizacao) {
            return "Tempo desconhecido";
        }

        const dataFinal = new Date(dataFinalizacao);
        const agora = new Date();

        if (dataFinal < agora) {
            return "Tempo expirado";
        }

        const diffMs = dataFinal.getTime() - agora.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);

        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const formatarData = (dataString: string | number | Date) => {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, "0");
        const minutos = String(data.getMinutes()).padStart(2, "0");
        const segundos = String(data.getSeconds()).padStart(2, "0");
        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    };

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
                        TempoRestante={calcularTempoRestante(chamado.dataFinalizacao)}
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
                        TempoRestante={calcularTempoRestante(chamado.dataFinalizacao)}
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
                        DataFinalizacao={formatarData(chamado.dataFinalizacao)}
                    />
                ))}
            </ChamadosArea>
        </div>
    );
}

export default AtendimentoSuporte;
