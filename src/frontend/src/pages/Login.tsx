import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

function Login() {
  // Define estados para armazenar o email/CPF e senha do formulário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Estado para armazenar mensagens de feedback

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

    try {
      // Envia uma requisição POST para o endpoint /login no servidor
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Envia os dados do formulário no corpo da requisição
      });

      const data = await response.json(); // Converte a resposta para JSON

      if (response.ok) {
        // Se a resposta for bem-sucedida (status 2xx), exibe mensagem de sucesso
        setMessage(data.message);
      } else {
        // Se a resposta não for bem-sucedida, exibe mensagem de erro
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.containerLogin}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="">Email ou CPF</label> <br />
          <input
            type="text"
            placeholder="Insira seu Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado 'username' com o valor do campo
          />{" "}
          <br />
          <label htmlFor="">Senha</label> <br />
          <input
            type="password" // Usa type="password" para esconder a senha
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password' com o valor do campo
          />{" "}
          <br />
          <p className={styles.esquecisenha}>
            <Link to="/esquecisenha">Esqueceu a senha?</Link>
          </p>
          <button type="submit" className={styles.botaoEntrar}>
            Entrar
          </button>{" "}
          <br />
          <p className={styles.linkCadastrar}>
            Ou <Link to="/cadastro">cadastre-se</Link>
          </p>
          {message !== "" && <p>{message}</p>} {/* Exibe a mensagem de feedback se houver uma mensagem definida */}
        </form>
      </div>
    </div>
  );
}

export default Login;
