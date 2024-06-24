import React, { useState, FormEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import styles from "../styles/CadastroEquipamentos.module.css";

function CadastroEquipamentos() {
    const [ip, setIp] = useState("");
    const [notas, setNotas] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [cpf, setCpf] = useState("");
    const [endereco, setEndereco] = useState(null);
    const [showEndereco, setShowEndereco] = useState(false);
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const notasRef = useRef<HTMLTextAreaElement>(null);

    const handleDescartar = () => {
        toast.success("Cadastro descartado com sucesso!");
        setTimeout(() => {
            navigate("/visualizarequipamento");
        }, 1000);
    };

    useEffect(() => {
        const fetchEndereco = async () => {
            const cleanedCpf = cpf.replace(/[.-]/g, "");
            if (cleanedCpf.length === 11) {
                try {
                    const response = await fetch(`http://localhost:5000/buscar-endereco/${cleanedCpf}`);
                    if (response.ok) {
                        const data = await response.json();
                        setCep(data.cep);
                        setEstado(data.estado);
                        setCidade(data.cidade);
                        setRua(data.rua);
                        setNumero(data.numero);
                        setComplemento(data.complemento);
                        setEndereco(data);
                        setShowEndereco(true); // Mostrar os campos de endereço
                        setShowMessage(true); // Mostrar a mensagem "oiii"
                    } else {
                        setEndereco(null);
                        setShowEndereco(false); // Esconder os campos de endereço se o usuário não for encontrado
                        setShowMessage(false); // Esconder a mensagem "oiii"
                    }
                } catch (error) {
                    console.error("Erro ao buscar endereço:", error);
                    setEndereco(null);
                    setShowEndereco(false); // Esconder os campos de endereço em caso de erro
                    setShowMessage(false); // Esconder a mensagem "oiii"
                }
            } else {
                setShowEndereco(false); // Esconder os campos de endereço se o CPF não estiver completo
                setShowMessage(false); // Esconder a mensagem "oiii"
            }
        };

        fetchEndereco();
    }, [cpf]);

    useEffect(() => {
        if (notasRef.current) {
            notasRef.current.style.height = "auto";
            notasRef.current.style.height = notasRef.current.scrollHeight + "px";
        }
    }, [notas]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!tipo || !status) {
            toast.error("Por favor, selecione o tipo e o status do equipamento.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const cleanedCpf = cpf.replace(/[.-]/g, "");

        const data = {
            ip,
            notas,
            tipo,
            status,
            cpf: cleanedCpf,
            cep,
            estado,
            cidade,
            rua,
            numero,
            complemento,
        };

        try {
            const response = await fetch("http://localhost:5000/cadastrar-equipamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Equipamento cadastrado com sucesso", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate("/visualizarequipamento");
                }, 1000);
            } else if (response.status === 404) {
                toast.error("Usuário não encontrado", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                throw new Error("Falha ao cadastrar equipamento");
            }
        } catch (error) {
            console.error("Erro ao cadastrar equipamento:", error);
            toast.error("Erro ao cadastrar equipamento", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className={styles.body}>
            <ToastContainer />
            <div className={styles.containerCadastro}>
                <h1>Cadastro de Equipamento</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.centeredDiv}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="ip">IP</label>
                            <InputMask
                                className={styles.estilo2}
                                mask="999.999.999.999"
                                placeholder="Insira o IP do equipamento"
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="notas">Notas adicionais</label>
                            <textarea
                                className={`${styles.estilo2} ${styles.textAreaExpansivel}`}
                                placeholder="Notas adicionais"
                                value={notas}
                                ref={notasRef}
                                onChange={(e) => setNotas(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="tipo">Tipo</label>
                            <select
                                className={styles.estilo2}
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione o tipo do equipamento
                                </option>
                                <option value="modem">Modem</option>
                                <option value="roteador">Roteador</option>
                                <option value="switch">Switch</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="status">Status</label>
                            <select
                                className={styles.estilo2}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione o status do equipamento
                                </option>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="cpf">CPF do Usuário</label>
                            <InputMask
                                className={styles.estilo2}
                                mask="999.999.999-99"
                                placeholder="Por favor, informe o CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                onBlur={() => setShowMessage(true)} // Mostrar a mensagem "oiii" quando o campo CPF for completado
                            />
                        </div>
                        {showEndereco && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="cep">CEP</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        placeholder="CEP"
                                        value={cep}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="estado">Estado</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        placeholder="Estado"
                                        value={estado}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="cidade">Cidade</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        placeholder="Cidade"
                                        value={cidade}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="rua">Rua</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        placeholder="Rua"
                                        value={rua}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="numero">Número</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        placeholder="Número"
                                        value={numero}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="complemento">Complemento</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        placeholder="Complemento"
                                        value={complemento}
                                        readOnly
                                    />
                                </div>
                            </>
                        )}
                    </div>
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

export default CadastroEquipamentos;
