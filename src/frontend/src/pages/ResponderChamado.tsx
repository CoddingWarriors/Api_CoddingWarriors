import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/ResponderChamado.module.css"
import { FormEvent, useEffect, useState } from "react";

function ResponderChamado() {
    const navigate = useNavigate();
    const [resposta, setResposta] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch("http://localhost:5000/responderchamado", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ resposta, token }),
                });

                const responseData = await response;

                // Exibir alerta de chamado criado com sucesso
                alert("Chamado respondido com sucesso");

                // Redirecionar para /atendimento
                navigate("/chamados");
            }}catch (error) {
            console.error("Erro ao criar chamado:", error);
            // Exibir alerta de erro
            alert("Erro ao responder o chamado. Por favor, tente novamente.");
        }
    }
    const { chamadoId } = useParams();
    const [chamado, setChamado] = useState({
        titulo: '',
        descricao: ''
    });

    useEffect(() => {
        async function fetchChamado() {
            try {
                const response = await fetch('http://localhost:5000/obter-informacoes-chamado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ chamadoId: chamadoId })
                });
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do chamado');
                }
                const dadosChamado = await response.json();
                console.log(dadosChamado);
                setChamado(dadosChamado);
            } catch (error) {
                console.error('Erro ao obter informações do chamado:', error);
            }
        }

        fetchChamado();
    }, [chamadoId]);

    return (
        <div className={styles.container}>
            <div className={styles.containerPerguntaExterno}>
                <h1>Chamado (ID)</h1>
                <div className={styles.containerPerguntaInterno}>
                    <div className={styles.containerInterno}>
                        <p className={styles.subtitulo}><strong>ID:</strong></p>
                        <p className={styles.conteudo}>(chamadoid)</p>

                        <p className={styles.subtitulo}><strong>Assunto:</strong></p>
                        <p className={styles.conteudo}>{chamado.titulo}</p>

                        <p className={styles.subtitulo}><strong>Descrição:</strong></p>
                        <p className={styles.conteudo}>{chamado.descricao}</p>

                        <p className={styles.subtitulo}><strong>Imagem</strong></p>
                        <p className={styles.conteudo}>(chamado.imagem aqui)</p>
                    </div>
                </div>
            </div>
            <div className={styles.containerRespostaExterno}>
                <h1>Resposta ao chamado (ID)</h1>
                <div className={styles.containerRespostaInterno}>
                    <div className={styles.containerInterno}>
                        <p className={styles.subtitulo}><strong>ID:</strong></p>
                        <p className={styles.conteudo}>(chamadoId)</p>

                        <form onSubmit={handleSubmit}>
                            <strong><label htmlFor="resposta">Resposta:</label></strong> <br />
                            <input type="text" id="resposta" value={resposta} onChange={(e) => setResposta(e.target.value)} className={styles.resposta} />
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.botoes}>
                <button type="submit" className={styles.responder}>Responder</button>
                <button className={styles.deletar}>Deletar</button>
            </div>
        </div>
    )
}

export default ResponderChamado