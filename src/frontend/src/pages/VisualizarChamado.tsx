import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/VisualizarChamado.module.css";

function VisualizarChamado() {
    const { chamadoId } = useParams();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userType, setUserType] = useState(null)
    const [chamado, setChamado] = useState({
        titulo: '',
        descricao: '',
        categoria: '',
        imagem: '',
        status: '',
        respostas: ''
    });

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
            fetchUserType(token)
        }
    }, [])

    const fetchUserType = async (token:any) => {
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
        }}

    useEffect(() => {
        async function fetchChamado() {
            try {
                const response = await fetch('http://localhost:5000/obter-informacoes-chamado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ chamadoId })
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
        <div className={styles.containerAbrirChamado}>
            {chamado.status === "Aberto" && (
                <h1 className={styles.titulo}>Chamado pendente</h1>
            )}
            {chamado.status === "Em andamento" && (
                <h1 className={styles.titulo}>Chamado em andamento</h1>
            )}
            {chamado.status === "Concluído" &&(
                <h1 className={styles.titulo}>Chamado concluído</h1>
            )}
            <p className={styles.labelText}>Título</p>
            <p className={styles.inputTitulo}>{chamado.titulo}</p>

            <p className={styles.labelText}>Descrição</p>
            <p className={styles.textareaDescricao}>{chamado.descricao}</p>

            <h2 className={styles.categoriasTitulo}>Categoria:<span className={styles.categoria}>{chamado.categoria}</span></h2>

            {chamado.imagem && (
                <div className={styles.containerImagem}>
                    <p>Imagem enviada</p>
                    <img src={chamado.imagem} alt="Imagem do chamado" className={styles.imagemChamado} />
                </div>
            )}
            {chamado.status === "Concluído" &&(
                <div>
                    <p className={styles.respostaTitulo}>Resposta</p>
                    <p className={styles.resposta}>{chamado.respostas}</p>
                </div>
            )}
            <div className={styles.botoes}>
                <button type="button" className={styles.voltar} onClick={() => navigate(-1)}>Voltar</button>
            </div>
        </div>
    );
}

export default VisualizarChamado;
