import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AbrirChamado.module.css";
import toast, { Toaster } from "react-hot-toast"

function AbrirChamado() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [permissionDenied, setPermissionDenied] = useState(false);

    useEffect(() => {
        // Verificar se o usuário está logado ao carregar a página
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Define isLoggedIn como true se o token existir
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!titulo.trim() || !descricao.trim() || !categoriaSelecionada) {
            toast.error("Por favor, preencha todos os campos.")
            return
        } 

        try {
            const token = localStorage.getItem("token");

            if (token) {
                const response = await fetch("http://localhost:5000/abrirchamado", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        titulo,
                        descricao,
                        categoria: categoriaSelecionada,
                        token,
                    }),
                });

                const responseData = await response;

                toast.success('Chamado criado com sucesso!');

        // Aguardar um curto período de tempo antes de navegar
                setTimeout(() => {
                    navigate("/atendimento");
                }, 1000);
                } else {
                    setPermissionDenied(true);
                }
        } catch (error) {
            console.error("Erro ao criar chamado:", error);
            // Exibir alerta de erro
            alert("Erro ao criar chamado. Por favor, tente novamente.");
        }
    }

    const handleDescartar = () => {
        toast.success('Chamado descartado com sucesso!');
        setTimeout(() => {
            navigate("/atendimento");
        }, 1000);
    };

    // Se o usuário não estiver logado, exibe mensagem de permissão negada e redireciona para /login
    if (!isLoggedIn || permissionDenied) {
        return (
            <div>
                <h1>Permissão Negada</h1>
                <p>Você precisa estar logado para acessar esta página.</p>
                <button onClick={() => navigate("/login")}>Ir para a página de Login</button>
            </div>
        );
    }

    return (
        <div className={styles.containerAbrirChamado}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>Abrir chamado</h1>
            <p>Nos forneça detalhes sobre o problema para que possamos identificar e oferecer a melhor solução possível</p>
            <form className={styles.formAbrirChamado} onSubmit={handleSubmit}>
                <label className={styles.labelText} htmlFor="titulo">Título</label> <br />
                <input className={styles.inputTitulo} type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} /> <br />

                <label className={styles.labelText} htmlFor="descricao">Descrição</label> <br />
                <textarea className={styles.textareaDescricao} id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} /> <br />

                <h2 className={styles.categoriasTitulo}>Selecione a categoria</h2>

                <label htmlFor="categoria-baixa" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-baixa" value="Velocidade de internet baixa" checked={categoriaSelecionada === 'Velocidade de internet baixa'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                    <span className={styles.spanRadio}>Velocidade de internet baixa</span>
                </label> <br />

                <label htmlFor="categoria-instavel" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-instavel" value="Internet instável" checked={categoriaSelecionada === 'Internet instável'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                    <span className={styles.spanRadio}>Internet instável</span>
                </label> <br />

                <label htmlFor="categoria-sem-conexao" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-sem-conexao" value="Sem conexão de internet" checked={categoriaSelecionada === 'Sem conexão de internet'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                    <span className={styles.spanRadio}>Sem conexão de internet</span>
                </label> <br />

                <div className={styles.botoes}>
                    <button type="submit" className={styles.enviar}>Enviar</button>
                    <button type="button" className={styles.descartar} onClick={handleDescartar}>Descartar</button>
                </div>
            </form>
        </div>
    );
}

export default AbrirChamado;