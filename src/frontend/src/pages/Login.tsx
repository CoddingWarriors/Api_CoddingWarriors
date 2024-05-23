import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { Toaster, toast } from 'react-hot-toast'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena o token recebido no localStorage
        localStorage.setItem("token", data.token);
        toast.success('Login realizado com sucesso')
        // Navega para a página /home se o login for bem-sucedido
        navigate("/");
      } else {
        toast.error('Credenciais inválidas')
        setUsername(""); // Limpa o campo de nome de usuário
        setPassword(""); // Limpa o campo de senha
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error('Erro ao fazer login')
    }
  };

  return (
    <div className={styles.body}>
      <Toaster />
      <div className={styles.containerLogin}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="">Email ou CPF</label> <br />
          <input
            type="text"
            placeholder="Insira seu Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <br />
          <label htmlFor="">Senha</label> <br />
          <input
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <div className={styles.containerBotoes}>
            <button type="submit" className={styles.botaoEntrar}>
              Entrar
            </button>{" "}
            <br />
            <p className={styles.linkCadastrar}>
              Ou <Link to="/cadastro">cadastre-se</Link>
            </p>
            <p className={styles.esquecisenha}>
              <Link to="/esquecisenha">Esqueceu a senha?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
