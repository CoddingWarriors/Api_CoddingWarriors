import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importe useNavigate em vez de useHistory
import styles from "../styles/Login.module.css";

function Login() {
  // Use useNavigate para navegação
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
        // Navegue para a página /home se o login for bem-sucedido
        navigate("/");
      } else {
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
          {message !== "" && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
