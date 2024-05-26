import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/CadastroEquipamentos.module.css";

function CadastroEquipamentos() {
    const [ip, setIp] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [notas, setNotas] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const handleDescartar = () => {
        toast.success('Cadastro descartado com sucesso!');
        setTimeout(() => {
            navigate("/visualizarequipamento");
        }, 1000);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    

        const data = {
            ip,
            localizacao,
            notas,
            tipo,
            status,
            userId: parseInt(userId)
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
                toast.success('Equipamento cadastrado com sucesso', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                setTimeout(() => {
                    navigate("/visualizarequipamento")
                }, 1000);
            } else if (response.status === 404) {
                toast.error('Usuário não encontrado', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            } else {
                throw new Error('Falha ao cadastrar equipamento');
            }
        } catch (error) {
            console.error("Erro ao cadastrar equipamento:", error);
            toast.error('Erro ao cadastrar equipamento', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
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
                            <input
                                className={styles.estilo2}
                                type="text"
                                placeholder="Insira o IP do equipamento"
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="localizacao">Localização</label>
                            <input
                                className={styles.estilo2}
                                type="text"
                                placeholder="Insira a localização do equipamento"
                                value={localizacao}
                                onChange={(e) => setLocalizacao(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="notas">Notas</label>
                            <input
                                className={styles.estilo2}
                                type="text"
                                placeholder="Notas adicionais"
                                value={notas}
                                onChange={(e) => setNotas(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="tipo">Tipo</label>
                            <input
                                className={styles.estilo2}
                                type="text"
                                placeholder="Tipo de equipamento"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="status">Status</label>
                            <input
                                className={styles.estilo2}
                                type="text"
                                placeholder="Status do equipamento"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="userId">ID do Usuário</label>
                            <input
                                className={styles.estilo2}
                                type="text"
                                placeholder="ID do usuário responsável"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
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
