import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import styles from "../styles/CadastrarFaq.module.css";

function CadastrarFaq() {
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

    const handleSubmit = async () => {
        const data = {
            pergunta,
            resposta
        }

        try {
            const response = await fetch("http://localhost:5000/cadastrar-faq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                toast.success("Faq cadastrado com sucesso", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(() => {
                    navigate("/visualizarfaq")
                }, 1000)
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
                })
            } else {
                throw new Error("Falha ao cadastrar faq")
            }
        } catch (error) {
            console.error("Erro ao cadastrar faq:", error)
            toast.error("Erro ao cadastrar faq", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

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
            <ToastContainer/>
            <h1 className={styles.tituloEditarFaq}>
                Cadastrar FAQ
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
                <button type="button" className={styles.buttonCadastrar} onClick={handleSubmit}>
                    Cadastrar
                </button>
            </div>
        </div>
    );
}

export default CadastrarFaq;