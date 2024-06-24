import React, { useState, FormEvent, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import InputMask from "react-input-mask";
import styles from "../styles/EditarEquipamento.module.css";

function EditarEquipamento() {
    const { equipamentoId } = useParams<{ equipamentoId: string }>();
    const navigate = useNavigate();
    const [equipamento, setEquipamento] = useState({
        ip: "",
        localizacao: "",
        notas: "",
        tipo: "",
        status: "",
        cpf_usuario: "",
    });
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [showEndereco, setShowEndereco] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const notasRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchEquipamento() {
            try {
                const response = await fetch("http://localhost:5000/buscar-equipamento", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ id_equipamento: equipamentoId }),
                });

                const data = await response.json();
                if (response.ok) {
                    setEquipamento(data);
                    // Preencher os campos de endereço se houver dados
                    setCep(data.cep || "");
                    setEstado(data.estado || "");
                    setCidade(data.cidade || "");
                    setRua(data.rua || "");
                    setNumero(data.numero || "");
                    setComplemento(data.complemento || "");
                    setShowEndereco(true); // Mostrar os campos de endereço
                } else {
                    throw new Error(data.message || "Erro ao buscar equipamento");
                }
            } catch (error) {
                console.error("Error fetching equipamento:", error);
            }
        }

        fetchEquipamento();
    }, [equipamentoId, navigate]);

    useEffect(() => {
        if (notasRef.current) {
            notasRef.current.style.height = "auto";
            notasRef.current.style.height = notasRef.current.scrollHeight + "px";
        }
    }, [equipamento.notas]);

    useEffect(() => {
        const fetchEndereco = async () => {
            const cleanedCpf = equipamento.cpf_usuario.replace(/[.-]/g, "");
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
                        setShowEndereco(true);
                        setShowMessage(true);
                    } else {
                        setShowEndereco(false);
                        setShowMessage(false);
                    }
                } catch (error) {
                    console.error("Erro ao buscar endereço:", error);
                    setShowEndereco(false);
                    setShowMessage(false);
                }
            } else {
                setShowEndereco(false);
                setShowMessage(false);
            }
        };

        fetchEndereco();
    }, [equipamento.cpf_usuario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEquipamento({ ...equipamento, [name]: value });
    };

    const handleDescartar = () => {
        toast.success("Alteração descartada com sucesso!");
        setTimeout(() => {
            navigate("/visualizarequipamento");
        }, 1000);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch("http://localhost:5000/atualizar-equipamento", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...equipamento, id_equipamento: equipamentoId }),
                });

                const text = await response.text();

                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }

                if (response.ok) {
                    toast.success("Equipamento editado com sucesso");
                    navigate("/visualizarequipamento");
                } else {
                    console.error("Erro ao editar o equipamento:", data);
                    toast.error(data.message || "Erro ao editar o equipamento. Por favor, tente novamente.");
                }
            }
        } catch (error) {
            console.error("Erro ao editar o equipamento:", error);
            toast.error("Erro ao editar o equipamento. Por favor, tente novamente.");
        }
    };

    return (
        <div className={styles.body}>
            <Toaster />
            <div className={styles.containerCadastro}>
                <h1>Editar Equipamento (ID: {equipamentoId})</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.centeredDiv}>
                        <div className={styles.inputGroup}>
                            <label>IP:</label>
                            <InputMask
                                className={styles.estilo2}
                                mask="999.999.999.999"
                                name="ip"
                                value={equipamento.ip}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Notas adicionais:</label>
                            <textarea
                                className={`${styles.estilo2} ${styles.textAreaExpansivel}`}
                                name="notas"
                                value={equipamento.notas}
                                onChange={handleChange}
                                placeholder="Notas adicionais"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Tipo:</label>
                            <input
                                className={styles.estilo2}
                                type="text"
                                name="tipo"
                                value={equipamento.tipo}
                                readOnly
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Status:</label>
                            <select
                                className={styles.estilo2}
                                name="status"
                                value={equipamento.status}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Selecione o status do equipamento
                                </option>
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>CPF do Usuário:</label>
                            <InputMask
                                className={styles.estilo2}
                                mask="999.999.999-99"
                                name="cpf_usuario"
                                value={equipamento.cpf_usuario}
                                onChange={handleChange}
                                onBlur={() => setShowMessage(true)}
                                placeholder="Por favor, informe o CPF"
                            />
                        </div>
                        {showEndereco && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label>CEP:</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        value={cep}
                                        readOnly
                                        placeholder="CEP"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Estado:</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        value={estado}
                                        readOnly
                                        placeholder="Estado"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Cidade:</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        value={cidade}
                                        readOnly
                                        placeholder="Cidade"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Rua:</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        value={rua}
                                        readOnly
                                        placeholder="Rua"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Número:</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        value={numero}
                                        readOnly
                                        placeholder="Número"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Complemento:</label>
                                    <input
                                        className={styles.estilo2}
                                        type="text"
                                        value={complemento}
                                        readOnly
                                        placeholder="Complemento"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className={styles.botoes}>
                        <button type="submit" className={styles.alterar2}>
                            Alterar
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

export default EditarEquipamento;
