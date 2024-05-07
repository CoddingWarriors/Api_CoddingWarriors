import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/EsqueciSenha.module.css";
import React, { useState, FormEvent } from "react";

function EsqueciSenha() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [emailSent, setEmailSent] = useState(false); // Estado para controlar se o e-mail foi enviado

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

        try {
            // Envia uma requisição POST para o endpoint /esquecisenha no servidor
            const response = await fetch("http://localhost:5000/esquecisenha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }), // Envia os dados do formulário no corpo da requisição
            });

            if (response.ok) {
                setEmailSent(true); // Define o estado emailSent como true se o envio for bem-sucedido
                window.alert("E-mail enviado com sucesso!"); // Exibe um alerta de sucesso
            } else {
                throw new Error("Falha ao enviar o e-mail"); // Lança um erro se o envio falhar
            }
        } catch (error) {
            console.error("Erro:", error);
            window.alert("Erro ao enviar o e-mail. Por favor, tente novamente."); // Exibe um alerta de erro
        }
    };

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className={styles.body}>
            <div className={styles.containerEsqueciSenha}>
                <h1>Recupere a sua senha</h1>
                <form className={styles.formEsqueciSenha} onSubmit={handleSubmit}>
                    <label htmlFor="">Email</label> <br />
                    <input
                        type="text"
                        placeholder="Insira o seu email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Atualiza o estado 'username' com o valor do campo
                    />{" "} <br />
                    <button>Enviar</button>
                </form>
                <p onClick={handleClick}>
                    <Link to="/login">Voltar</Link>
                </p>
            </div>
        </div>
    );
}

export default EsqueciSenha;
