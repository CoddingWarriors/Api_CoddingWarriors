import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/EsqueciSenha.module.css"
import React, { useState, FormEvent } from "react";


function NovaSenha() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
   // const token = token(banco de dados)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

        try {
            // Envia uma requisição POST para o endpoint /login no servidor
            const response = await fetch(`http://localhost:5000/novasenha`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, password2 }), // Envia os dados do formulário no corpo da requisição
            });


           

          
        } catch (error) {
            console.error("Erro:", error);
        }
       
    };
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/login');
    };

    return (
        <div className={styles.body}>
            <div className={styles.containerEsqueciSenha}>
                <h1>Altere a sua senha</h1>
                <form className={styles.formEsqueciSenha} onSubmit={handleSubmit}>
                    <label htmlFor="">Nova Senha</label> <br />
                    <input type="password" placeholder="Insira a sua nova senha" value={password} onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'username' com o valor do campo
                    />{" "} <br />
                    <label htmlFor="">Confirme sua nova senha</label> <br />
                    <input type="password" placeholder="Digite novamente a sua senha" value={password2} onChange={(e) => setPassword2(e.target.value)} // Atualiza o estado 'username' com o valor do campo
                    />{" "}  <br />
                    <button type="submit">Alterar</button>{" "}
                </form>
                <p onClick={handleClick}>
                    <Link to="/login">Voltar</Link>
                </p>
            </div>
        </div>
    )
}

export default NovaSenha