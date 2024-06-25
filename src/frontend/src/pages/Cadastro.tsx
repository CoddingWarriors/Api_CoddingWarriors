import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Cadastro.module.css";
import React, { useState, FormEvent, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import InputMask from 'react-input-mask';

function Cadastro() {
    // Definir estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("Informe o CEP acima");
    const [cidade, setCidade] = useState("Informe o CEP acima");
    const [rua, setRua] = useState("Informe o CEP acima");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (cep.replace(/[^\d]/g, "").length === 8) {
            buscarEndereco(cep);
        } else {
            setEstado("Informe o CEP acima");
            setCidade("Informe o CEP acima");
            setRua("Informe o CEP acima");
            setComplemento("");
        }
    }, [cep]);

    const handleDescartar = () => {
        toast.success('Seu cadastro foi descartado');
        navigate("/login");
    };

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

    const buscarEndereco = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
            const data = await response.json();
            if (data.erro) {
                setEstado("Informe o CEP acima");
                setCidade("Informe o CEP acima");
                setRua("Informe o CEP acima");
                setComplemento("");
                toast.error("Erro ao buscar o CEP");
                return;
            }
            setEstado(data.uf);
            setCidade(data.localidade);
            setRua(data.logradouro);
            setComplemento(data.complemento);
        } catch (error) {
            setEstado("Informe o CEP acima");
            setCidade("Informe o CEP acima");
            setRua("Informe o CEP acima");
            setComplemento("");
            toast.error("Erro ao buscar o CEP");
        }
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

        if (!verificaCPFValido(cpf)) {
            toast.error('CPF inválido');
            return;
        }

        if (!verificaEmailValido(email)) {
            toast.error('Email inválido');
            return;
        }

        // Organizar os dados na ordem das colunas da tabela usuario
        const data = {
            cpf: cpf.replace(/[^\d]/g, ""), // Remove a máscara antes de enviar
            nome,
            telefone: telefone.replace(/[^\d]/g, ""),
            email,
            senha,
            estado,
            cidade,
            rua,
            numero,
            complemento,
            cep: cep.replace(/[^\d]/g, ""), // Remove a máscara antes de enviar
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

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error);
                return;
            }

            // Se chegou aqui, significa que tudo ocorreu corretamente
            // Exibe a mensagem de sucesso
            toast.success('Usuário cadastrado com sucesso');

            // Limpa os campos do formulário após o envio bem-sucedido
            setNome("");
            setCpf("");
            setTelefone("");
            setEmail("");
            setCep("");
            setEstado("Informe o CEP acima");
            setCidade("Informe o CEP acima");
            setRua("Informe o CEP acima");
            setNumero("");
            setComplemento("");
            setSenha("");

            navigate("/login")
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    return (
        <div className={styles.body}>
            <Toaster />
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
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="Insira seu CPF"
                        />
                        <br />
                    </div>

                    <div>
                        <label htmlFor="">Número de telefone</label> <br />
                        <InputMask
                            mask="(99) 99999-9999"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="Insira o seu número"
                        />
                        <br />

                        <label htmlFor="">Email</label> <br />
                        <input
                            type="text"
                            value={email}
                            placeholder="Insira o seu email"
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
                        <InputMask
                            mask="99999-999"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            placeholder="Insira o seu CEP"
                        />
                        <br />

                        <label htmlFor="" className={styles.newInput}>Estado</label> <br />
                        <input
                            type="text"
                            placeholder="Informe o CEP acima"
                            value={estado}
                            readOnly
                            className={`${styles.newInput} ${cep.replace(/[^\d]/g, "").length === 8 ? '' : styles.readOnly}`}
                        />
                        <br />

                        <label htmlFor="" className={styles.newInput}>Cidade</label> <br />
                        <input
                            type="text"
                            placeholder="Informe o CEP acima"
                            value={cidade}
                            readOnly
                            className={`${styles.newInput} ${cep.replace(/[^\d]/g, "").length === 8 ? '' : styles.readOnly}`}
                        />
                        <br />

                        <label htmlFor="" className={styles.newInput}>Rua</label> <br />
                        <input
                            type="text"
                            placeholder="Informe o CEP acima"
                            value={rua}
                            readOnly
                            className={`${styles.newInput} ${cep.replace(/[^\d]/g, "").length === 8 ? '' : styles.readOnly}`}
                        />
                        <br />

                        <label htmlFor="" className={styles.newInput}>Nº</label> <br />
                        <input
                            type="text"
                            placeholder="Insira o número da sua casa"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />{" "}
                        <br />

                        <label htmlFor="" className={styles.newInput}>Complemento</label> <br />
                        <input
                            type="text"
                            placeholder="Insira o complemento"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
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
                    <div className={styles.containerCadastrar}>
                        <button type="submit" className={styles.cadastrar}>
                            Cadastrar
                        </button>
                    </div>
                </form>
                <p className={styles.descartar} onClick={handleDescartar}>Descartar</p>
            </div>
        </div>
    );
}

export default Cadastro;