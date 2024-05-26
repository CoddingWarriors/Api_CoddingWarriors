import { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/EditarEquipamento.module.css";

function EditarEquipamento() {
    const { equipamentoId } = useParams<{ equipamentoId: string }>();
    const navigate = useNavigate();
    const [equipamento, setEquipamento] = useState({
        dt_instalacao: '',
        ip: '',
        localizacao: '',
        notas: '',
        tipo: '',
        status: '',
        userId: '',
    });

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
                } else {
                    throw new Error(data.message || "Erro ao buscar equipamento");
                }
            } catch (error) {
                console.error("Error fetching equipamento:", error);
            }
        }

        fetchEquipamento();
    }, [equipamentoId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEquipamento({ ...equipamento, [name]: value });
    };

    const handleDescartar = () => {
        toast.success('Alteração descartada com sucesso!');
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

                if (response.ok) {
                    toast.success("Equipamento editado com sucesso");
                    navigate("/visualizarequipamento"); // Redirecionar após sucesso
                } else {
                    throw new Error("Erro ao editar o equipamento");
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
                            <label>Data de Instalação:</label>
                            <input 
                                className={styles.estilo2}
                                type="date" 
                                name="dt_instalacao" 
                                value={equipamento.dt_instalacao} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>IP:</label>
                            <input 
                                className={styles.estilo2}
                                type="text" 
                                name="ip" 
                                value={equipamento.ip} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Localização:</label>
                            <input 
                                className={styles.estilo2}
                                type="text" 
                                name="localizacao" 
                                value={equipamento.localizacao} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Notas:</label>
                            <textarea 
                                className={styles.estilo2}
                                name="notas" 
                                value={equipamento.notas} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Tipo:</label>
                            <input 
                                className={styles.estilo2}
                                type="text" 
                                name="tipo" 
                                value={equipamento.tipo} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Status:</label>
                            <input 
                                className={styles.estilo2}
                                type="text" 
                                name="status" 
                                value={equipamento.status} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>ID do Usuário:</label>
                            <input 
                                className={styles.estilo2}
                                type="text"
                                name="userId" 
                                value={equipamento.userId} 
                                onChange={handleChange} 
                            />
                        </div>
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
