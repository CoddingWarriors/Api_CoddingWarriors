import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/EditarFaq.module.css";
import { ToastContainer } from "react-toastify";

function EditarFaq() {
    const { faqId } = useParams<{ faqId: string }>();
    const navigate = useNavigate();
    const [faq, setFaq] = useState({
        perguntas: "",
        respostas: ""
    });
    const [isEditing, setIsEditing] = useState(false);

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
                    body: JSON.stringify({ id_faq: faqId, ...faq }),
                });
    
                const data = await response.json();
                console.log('Response data:', data);
    
                if (response.ok) {
                    toast.success("FAQ editado com sucesso");
                    setTimeout(() => {
                        navigate("/visualizarfaq");
                    }, 1000);
                } else {
                    throw new Error(data.message || "Erro ao editar a FAQ");
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
        <div className={`${styles.containerEditarFaq} container`}>
            <ToastContainer />
            <h1 className={`${styles.tituloEditarFaq} my-4`}>FAQ (ID: {faqId})</h1>
            <form className={styles.faqArea} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className={styles.label}>Pergunta:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="perguntas"
                        value={faq.perguntas}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        style={{ color: isEditing ? 'black' : 'gray', backgroundColor: 'white' }}
                        placeholder={!isEditing ? faq.perguntas : ''}
                    />
                </div>
                <div className="form-group">
                    <label className={styles.label}>Resposta:</label>
                    <textarea
                        className="form-control"
                        name="respostas"
                        value={faq.respostas}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        style={{ color: isEditing ? 'black' : 'gray', backgroundColor: 'white' }}
                        placeholder={!isEditing ? faq.respostas : ''}
                    />
                </div>
                <div className={`${styles.buttonsContainer} mt-3`}>
                    {isEditing ? (
                        <>
                            <button type="button" className="btn btn-danger" onClick={handleDescartar}>
                                Descartar
                            </button>
                            <button type="submit" className="btn btn-success" style={{margin: "0 100px 0 0"}} >
                                Alterar
                            </button>
                        </>
                    ) : (
                    <>
                        <button type="button" className="btn btn-primary" style={{margin: "30px 100px 0 0"}} onClick={() => setIsEditing(true)}>
                            Editar
                        </button>
                    </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default EditarFaq;
