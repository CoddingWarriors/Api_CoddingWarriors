import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EditarFaq.module.css";

function EditarFaq() {
    const [pergunta, setPergunta] = useState("");
    const [resposta, setResposta] = useState("");
    const navigate = useNavigate();

    const handlePerguntaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPergunta(event.target.value);
    };

    const handleRespostaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResposta(event.target.value);
    };

    const handleDescartar = () => {
        setPergunta("");
        setResposta("");
        navigate("/visualizarfaq");
    };

    const handleAlterar = () => {
        // Aqui você pode adicionar a lógica para alterar a FAQ
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchUserType() {
            try {
                const response = await fetch("http://localhost:5000/usuariotipo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ token })
                });
        
                const data = await response.json();
        
                if (!response.ok) {
                    throw new Error(data.message);
                }
        
                if (data.tipoUsuario !== '3') {
                    navigate("/");
                    return;
                }
            } catch (error) {
                console.error("Error verifying user type:", error);
                navigate("/");
            }
        }
        fetchUserType();
    }, [navigate]);

    return (
        <div className={styles.containerEditarFaq}>
            <h1 className={styles.tituloEditarFaq}>
                FAQ
            </h1>
            <div className={styles.faqArea}>
                <label className={styles.label}>Pergunta:</label>
                <input
                    className={styles.inputPergunta}
                    type="text"
                    value={pergunta}
                    onChange={handlePerguntaChange}
                    placeholder="Digite a pergunta aqui"
                />
                <label className={styles.label}>Resposta:</label>
                <textarea
                    className={styles.textareaResposta}
                    value={resposta}
                    onChange={handleRespostaChange}
                    placeholder="Digite a resposta aqui"
                />
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.buttonDescartar} onClick={handleDescartar}>
                    Descartar
                </button>
                <button className={styles.buttonAlterar} onClick={handleAlterar}>
                    Alterar
                </button>
            </div>
        </div>
    );
}

export default EditarFaq;