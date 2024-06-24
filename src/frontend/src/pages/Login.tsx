import React, { useState, FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { Toaster, toast } from 'react-hot-toast';
import InputMask from 'react-input-mask';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCpfMask, setIsCpfMask] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 2 && /^[0-9]$/.test(value.charAt(1))) {
      setIsCpfMask(true);
    } else if (value.length === 0) {
      setIsCpfMask(false);
    }

    setUsername(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove mask from CPF if applied
    const cleanedUsername = isCpfMask ? username.replace(/[^\d]/g, "") : username;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: cleanedUsername, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success('Login realizado com sucesso');
        document.body.classList.add(styles.fadeOut);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500);
      } else {
        if (data.message === 'Você só pode acessar seu login no seu horário de trabalho') {
          toast.error(data.message);
        } else {
          toast.error('Credenciais inválidas');
        }
        setUsername(""); // Limpa o campo de nome de usuário
        setPassword(""); // Limpa o campo de senha
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error('Erro ao fazer login');
    }
  };

  return (
    <div className={styles.body}>
      <Toaster />
      <div className={styles.containerLogin}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="">Email ou CPF</label> <br />
          {isCpfMask ? (
            <InputMask
              mask="999.999.999-99"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Insira seu CPF"
              maskPlaceholder=""
            />
          ) : (
            <input
              type="text"
              placeholder="Insira seu Login"
              value={username}
              onChange={handleUsernameChange}
            />
          )}
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
