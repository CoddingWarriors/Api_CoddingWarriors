import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FaqArea from "../components/FaqArea";
import Faq from "../components/Faq";
import styles from "../styles/VisualizarFaq.module.css";
import { Link } from "react-router-dom";

function VisualizarFaq() {
    const [faq, setFaq] = useState<any[]>([]);
    const navigate = useNavigate();

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

        async function fetchfaq() {
            try {
                const response = await fetch("http://localhost:5000/get-faq", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                
                if (response.ok) {
                    setFaq(data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error("Error fetching faq:", error);
            }
        }

        fetchUserType().then(fetchfaq);
    }, [navigate]);

    return (
        <div className={styles.containerVisualizarEquipamento}>
            <h1 className={styles.tituloVisualizarEquipamento}>FAQ</h1>
            <FaqArea>
                <div className={styles.equipamentosContainer}>
                    {faq.length > 0 ? (
                        <div className={styles.equipamentosScroll}>
                            {faq.map(faqItem => (
                                <div className={styles.wrapper} key={faqItem.id_faq}>
                                    <Faq
                                        id_faq={faqItem.id_faq}
                                        pergunta={faqItem.perguntas}
                                        resposta={faqItem.respostas}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.NenhumEquipamento}>
                            <p className={styles.NenhumEquipamentoTexto}>Nenhum FAQ registrado.</p>
                        </div>
                    )}
                </div>
            </FaqArea>
            <div className={styles.buttons}>
                <Link to="/cadastrarfaq">
                    <button className={styles.addButton}>Adicionar</button>
                </Link>
            </div>
        </div>
    );
}

export default VisualizarFaq;
