import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/Equipamentos.module.css";

function Equipamentos() {
    const [ip, setIp] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [notas, setNotas] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

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
                navigate("/cadastrarequipamentos");
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
                    <div>
                        <label htmlFor="ip">IP</label> <br />
                        <input
                            type="text"
                            placeholder="Insira o IP do equipamento"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                        /> <br />

                        <label htmlFor="localizacao">Localização</label> <br />
                        <input
                            type="text"
                            placeholder="Insira a localização do equipamento"
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                        /> <br />

                        <label htmlFor="notas">Notas</label> <br />
                        <input
                            type="text"
                            placeholder="Notas adicionais"
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                        /> <br />

                        <label htmlFor="tipo">Tipo</label> <br />
                        <input
                            type="text"
                            placeholder="Tipo de equipamento"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        /> <br />

                        <label htmlFor="status">Status</label> <br />
                        <input
                            type="text"
                            placeholder="Status do equipamento"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        /> <br />

                        <label htmlFor="userId">ID do Usuário</label> <br />
                        <input
                            type="text"
                            placeholder="ID do usuário responsável"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        /> <br />
                    </div>

                    <button type="submit" className={styles.cadastrar}>
                        Cadastrar Equipamento
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Equipamentos;
