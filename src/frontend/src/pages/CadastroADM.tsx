import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/CadastroSuporte.module.css";
import React, { useState, FormEvent } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function CadastroADM() {
    // Definir estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [horario, setHorario] = useState("");
    const navigate = useNavigate()
    const verificaCPFValido = (cpf: string): boolean => {
        cpf = cpf.replace(/[^\d]/g, "");

        if (cpf.length !== 11) {
            return false;
        }

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
            return false;
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

        if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
            return false;
        }

        return true;
    };

    const verificaEmailValido = (email: string): boolean => {
        // Verifica se o email contém exatamente um "@" e não contém espaços em branco
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
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
            tipo,
            horario
        };
        
        // Envia os dados para o back-end
        try {
            if (!verificaCPFValido(cpf)) {
                toast.error('CPF inválido')
                return;
            }

            if (!verificaEmailValido(email)) {
                toast.error('Email inválido');
                return;
            }
            const response = await fetch("http://localhost:5000/cadastrosuporte", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error);
                return;
            }
    
            // Se chegou aqui, significa que tudo ocorreu corretamente
            // Exibe a mensagem de sucesso
            toast.success('Usuário cadastrado com sucesso');

            
            // Exibir a mensagem de sucesso como um alerta
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
            setTipo("");
            setHorario("");


        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    return (
        <div className={styles.body}>
            <ToastContainer />
            <div className={styles.containerCadastro}>
                <h1>Cadastro de Usuários</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.centeredDiv}>
                        <input
                            className={styles.estilo2}
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />{" "}
                        <br />
                    </div>
                    <div className={styles.centeredDiv}>
                        <select
                            className={styles.estilo2}
                            name="tipo-usuario"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="" disabled>Tipo do Usuário</option>
                            <option value="3">Administrador</option>
                            <option value="2">Suporte</option>
                        </select>
                        <select
                            className={styles.estilo2}
                            name="horario"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                        >
                            <option value="" disabled>Horário de Trabalho</option>
                            <option value="das 06:00 as 08:00 ">06:00 - 08:00</option>
                            <option value="das 08:00 as 10:00">08:00 - 10:00</option>
                            <option value="das 10:00 as 12:00">10:00 - 12:00</option>
                        </select>
                        <br />
                    </div>

                    <div>
                        <input
                            className={styles.estilo2}
                            type="text"
                            placeholder="Email"
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
                        <input
                            className={styles.estilo2}
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />{" "}
                        <br />
                    </div>
                    <div>
                        <input
                            className={styles.estilo2}
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />{" "}
                        <br />
                    </div>
                    <div className={styles.enderecoContainer}>
                        <input
                            className={styles.inputCep}
                            type="text"
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />{" "}
                        <br />

                        <input
                            className={styles.inputRua}
                            type="text"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />{" "}
                        <br />

                        <input
                            className={styles.inputNumero}
                            type="text"
                            placeholder="Nº"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />{" "}
                        <br />
                    </div>

                    <div className={styles.botoes}>
                        <button type="submit" className={styles.cadastrar2}>
                            Cadastrar
                        </button>

                        <button className={styles.descartar2}>
                            <Link to="/login">Descartar</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>




    );
}

export default CadastroADM;
