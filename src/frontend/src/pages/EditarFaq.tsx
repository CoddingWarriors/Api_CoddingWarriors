import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../styles/EditarFaq.module.css";
import { ToastContainer } from "react-toastify";

function EditarFaq() {
    const { faqId } = useParams<{ faqId: string }>();
    const navigate = useNavigate();
    const [faq, setFaq] = useState({
        pergunta: "",
        resposta: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchFaq() {
            try {
                const response = await fetch("http://localhost:5000/buscar-faq", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ id_faq: faqId }),
                });

                const data = await response.json();
                if (response.ok) {
                    setFaq(data);
                } else {
                    throw new Error(data.message || "Erro ao buscar FAQ");
                }
            } catch (error) {
                console.error("Error fetching FAQ:", error);
            }
        }

        fetchFaq();
    }, [faqId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFaq({ ...faq, [name]: value });
    };

    const handleDescartar = () => {
        toast.success("Alteração descartada com sucesso!");
        setTimeout(() => {
            navigate("/visualizarfaq");
        }, 1000);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch("http://localhost:5000/editarfaq", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...faq, id_faq: faqId }),
                });

                if (response.ok) {
                    toast.success("FAQ editado com sucesso");
                    navigate("/visualizarfaq");
                } else {
                    throw new Error("Erro ao editar a FAQ");
                }
            }
        } catch (error) {
            console.error("Erro ao editar a FAQ:", error);
            toast.error("Erro ao editar a FAQ. Por favor, tente novamente.");
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
            <h1 className={styles.tituloEditarFaq}>FAQ (ID: {faqId})</h1>
            <form className={styles.faqArea} onSubmit={handleSubmit}>
                <label className={styles.label}>Pergunta:</label>
                <input
                    className={styles.inputPergunta}
                    type="text"
                    name="pergunta"
                    value={faq.pergunta}
                    onChange={handleChange}
                    placeholder="Digite a pergunta aqui"
                />
                <label className={styles.label}>Resposta:</label>
                <textarea
                    className={styles.textareaResposta}
                    name="resposta"
                    value={faq.resposta}
                    onChange={handleChange}
                    placeholder="Digite a resposta aqui"
                />
                <div className={styles.buttonsContainer}>
                    <button type="button" className={styles.buttonDescartar} onClick={handleDescartar}>
                        Descartar
                    </button>
                    <button type="submit" className={styles.buttonAlterar}>
                        Alterar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditarFaq;
