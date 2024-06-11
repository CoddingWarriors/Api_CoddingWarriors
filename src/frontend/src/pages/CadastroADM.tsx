import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import InputMask from "react-input-mask";
import styles from "../styles/CadastroSuporte.module.css";

function CadastroADM() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFim, setHorarioFim] = useState("");
    const navigate = useNavigate();

    const handleDescartar = () => {
        toast.success('Chamado descartado com sucesso!');
        setTimeout(() => {
            navigate("/homeadm");
        }, 1000);
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            cpf: cpf.replace(/[^\d]/g, ""),
            nome,
            telefone,
            email,
            senha,
            endereco,
            numero,
            cep: cep.replace(/[^\d]/g, ""),
            tipo,
            horario_inicio: horarioInicio,
            horario_fim: horarioFim
        };

        try {
            if (!verificaCPFValido(cpf)) {
                toast.error('CPF inválido');
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

            toast.success('Usuário cadastrado com sucesso');

            setNome("");
            setCpf("");
            setTelefone("");
            setEmail("");
            setCep("");
            setEndereco("");
            setNumero("");
            setSenha("");
            setTipo("");
            setHorarioInicio("");
            setHorarioFim("");

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    return (
        <div className={styles.body}>
            <Toaster />
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
                        />
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
                        <br />
                    </div>
                    <div className={styles.centeredDiv}>
                        <select
                            className={styles.estilo2}
                            name="horarioInicio"
                            value={horarioInicio}
                            onChange={(e) => setHorarioInicio(e.target.value)}
                        >
                            <option value="" disabled>Horário de Início</option>
                            <option value="00:01:00">00:01</option>
                            <option value="06:00:00">06:00</option>
                            <option value="08:00:00">08:00</option>
                            <option value="10:00:00">10:00</option>
                        </select>
                        <select
                            className={styles.estilo2}
                            name="horarioFim"
                            value={horarioFim}
                            onChange={(e) => setHorarioFim(e.target.value)}
                        >
                            <option value="" disabled>Horário de Fim</option>
                            <option value="12:00:00">12:00</option>
                            <option value="14:00:00">14:00</option>
                            <option value="16:00:00">16:00</option>
                            <option value="23:59:00">23:59</option>
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
                        />
                        <br />
                    </div>
                    <div>
                        <InputMask
                            mask='999.999.999-99'
                            className={styles.estilo2}
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <br />
                    </div>
                    <div className={styles.enderecoContainer}>
                        <InputMask
                            mask='99999-999'
                            className={styles.inputCep}
                            type="text"
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />
                        <br />
                        <input
                            className={styles.inputRua}
                            type="text"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <br />
                        <input
                            className={styles.inputNumero}
                            type="text"
                            placeholder="Nº"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                        <br />
                    </div>
                    <div className={styles.centeredDiv}>
                        <input
                            className={styles.estilo2}
                            type="text"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                        <br />
                    </div>
                    <div className={styles.botoes}>
                        <button type="submit" className={styles.cadastrar2}>
                            Cadastrar
                        </button>
                        <button onClick={handleDescartar} className={styles.descartar2}>Descartar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastroADM;
