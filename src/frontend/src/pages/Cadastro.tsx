import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Cadastro.module.css";
import React, { useState, FormEvent } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import InputMask from "react-input-mask";
function Cadastro() {
    // Definir estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate()
    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

        // Organizar os dados na ordem das colunas da tabela usuario
        const data = {
            cpf,
            nome,
            telefone,
            email,
            senha,
            endereco,
            numero,
            cep,
            tipo: 1, // Definindo tipo como 1
        };

        // Envia os dados para o back-end
        try {
            const response = await fetch("http://localhost:5000/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            toast.success('Usuário cadastrado com sucesso', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
                // Redirecionar para /atendimento
            navigate("/login");
            const responseData = await response.json();
            console.log(responseData); 
            
            // Exibe a resposta do servidor no console

            // Limpa os campos do formulário após o envio bem-sucedido
            setNome("");
            setCpf("");
            setTelefone("");
            setEmail("");
            setCep("");
            setEndereco("");
            setNumero("");
            setSenha("");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    return (
        <div className={styles.body}>
            <ToastContainer />
            <div className={styles.containerCadastro}>
                <h1>Cadastro</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Nome Completo</label> <br />
                        <input
                            type="text"
                            placeholder="Insira seu nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />{" "}
                        <br />

                        <label htmlFor="">CPF</label> <br />
                        <InputMask
                            mask="999.999.999-99"
                            maskChar={null}
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <br />


                    </div>

                    <div>
                        <label htmlFor="">Número de telefone</label> <br />
                        <input
                            type="text"
                            placeholder="Insira o seu número"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />{" "}
                        <br />

                        <label htmlFor="">Email</label> <br />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Verifica se o valor inserido contém apenas uma "@" e não contém espaços em branco
                                if ((value.split("@").length <= 2 && !value.includes(" "))) {
                                    setEmail(value);
                                }
                            }}
                        />
                        <br />
                    </div>

                    <div>
                        <label htmlFor="">CEP</label> <br />
                        <input
                            type="text"
                            placeholder="Insira o seu CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />{" "}
                        <br />

                        <label htmlFor="">Rua</label> <br />
                        <input
                            type="text"
                            placeholder="Insira o nome da sua Rua"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />{" "}
                        <br />

                        <label htmlFor="">Nº</label> <br />
                        <input
                            type="text"
                            placeholder="Insira o número da sua casa"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />{" "}
                        <br />
                    </div>

                    <label htmlFor="">Senha</label> <br />
                    <input
                        type="password"
                        placeholder="Insira sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />{" "}
                    <br />
                    <button type="submit" className={styles.cadastrar}>
                        Cadastrar
                    </button>
                </form>
                <p className={styles.descartar}>
                    <Link to="/login">Descartar</Link>
                </p>
            </div>
        </div>
    );
}

export default Cadastro;
