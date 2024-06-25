import React, { useState, FormEvent, useEffect } from "react";
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
    const [estado, setEstado] = useState("Informe o CEP acima");
    const [cidade, setCidade] = useState("Informe o CEP acima");
    const [rua, setRua] = useState("Informe o CEP acima");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [inicioExpediente, setInicioExpediente] = useState("");
    const [fimExpediente, setFimExpediente] = useState("");
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
        toast.success('Chamado descartado com sucesso!');
        setTimeout(() => {
            navigate("/dashboard");
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!verificaCPFValido(cpf)) {
            toast.error('CPF inválido');
            return;
        }

        if (!verificaEmailValido(email)) {
            toast.error('Email inválido');
            return;
        }

        const data = {
            cpf: cpf.replace(/[^\d]/g, ""),
            nome,
            telefone: telefone.replace(/[^\d]/g, ""),
            email,
            senha,
            estado,
            cidade,
            rua,
            numero,
            complemento,
            cep: cep.replace(/[^\d]/g, ""),
            tipo,
            horario_inicio: inicioExpediente,
            horario_fim: fimExpediente
        };

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

            toast.success('Usuário cadastrado com sucesso');

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
            setTipo("");
            setInicioExpediente("");
            setFimExpediente("");

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    return (
        <div className={styles.body}>
            <Toaster />
            <div className={styles.containerCadastro}>
                <h1>Cadastro de Funcionário</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Nome</label>
                    <input
                        className={styles.estilo2}
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <br />
                    <label>CPF</label>
                    <InputMask
                        mask='999.999.999-99'
                        className={styles.estilo2}
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <br />
                    <label>Telefone</label>
                    <InputMask
                        mask='(99) 99999-9999'
                        className={styles.estilo2}
                        type="text"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                    <br />
                    <label>Email</label>
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
                    <label>Senha</label>
                    <input
                        className={styles.estilo2}
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <br />
                    <label>CEP</label>
                    <InputMask
                        mask='99999-999'
                        className={styles.estilo2}
                        type="text"
                        placeholder="CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />
                    <br />
                    <label>Estado</label>
                    <input
                        className={`${styles.estilo2} ${cep.replace(/[^\d]/g, "").length === 8 ? '' : styles.readOnly}`}
                        type="text"
                        placeholder="Informe o CEP acima"
                        value={estado}
                        readOnly
                    />
                    <br />
                    <label>Cidade</label>
                    <input
                        className={`${styles.estilo2} ${cep.replace(/[^\d]/g, "").length === 8 ? '' : styles.readOnly}`}
                        type="text"
                        placeholder="Informe o CEP acima"
                        value={cidade}
                        readOnly
                    />
                    <br />
                    <label>Rua</label>
                    <input
                        className={`${styles.estilo2} ${cep.replace(/[^\d]/g, "").length === 8 ? '' : styles.readOnly}`}
                        type="text"
                        placeholder="Informe o CEP acima"
                        value={rua}
                        readOnly
                    />
                    <br />
                    <label>Número</label>
                    <input
                        className={styles.estilo2}
                        type="text"
                        placeholder="Número"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                    <br />
                    <label>Complemento</label>
                    <input
                        className={styles.estilo2}
                        type="text"
                        placeholder="Complemento"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                    />
                    <br />
                    <label>Tipo do Usuário</label>
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
                    <label>Início do Expediente</label>
                    <select
                        className={styles.estilo2}
                        name="inicioExpediente"
                        value={inicioExpediente}
                        onChange={(e) => setInicioExpediente(e.target.value)}
                    >
                        <option value="" disabled>Início do Expediente</option>
                        <option value="00:01:00">00:01</option>
                        <option value="06:00:00">06:00</option>
                        <option value="08:00:00">08:00</option>
                        <option value="10:00:00">10:00</option>
                    </select>
                    <br />
                    <label>Fim do Expediente</label>
                    <select
                        className={styles.estilo2}
                        name="fimExpediente"
                        value={fimExpediente}
                        onChange={(e) => setFimExpediente(e.target.value)}
                    >
                        <option value="" disabled>Fim do Expediente</option>
                        <option value="12:00:00">12:00</option>
                        <option value="14:00:00">14:00</option>
                        <option value="16:00:00">16:00</option>
                        <option value="23:59:00">23:59</option>
                    </select>
                    <br />
                    <div className={styles.botoes}>
                        <button type="submit" className={styles.cadastrar2}>
                            Cadastrar
                        </button>
                        <button type="button" onClick={handleDescartar} className={styles.descartar2}>
                            Descartar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastroADM;
