import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FaqArea from "../components/FaqArea";
import Faq from "../components/Faq";
import styles from "../styles/VisualizarFaq.module.css";

function VisualizarFaq() {
    const [equipamentos, setEquipamentos] = useState<any[]>([]);
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate("/cadastrarfaq");
    }

    const handleGoBack = () => {
        navigate("/faq");
    }

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

        async function fetchEquipamentos() {
            try {
                const response = await fetch("http://localhost:5000/get-equipamentos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setEquipamentos(data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error("Error fetching equipamentos:", error);
            }
        }

        fetchUserType().then(fetchEquipamentos);
    }, [navigate]);


    return (
        <div className={styles.containerVisualizarEquipamento}>
            <h1 className={styles.tituloVisualizarEquipamento}>
                FAQ
            </h1>
            <FaqArea>
                <div className={styles.equipamentosContainer}>
                    {equipamentos.length > 0 ? (
                        <div className={styles.equipamentosScroll}>
                            {equipamentos.map(equipamento => (
                                <div className={styles.wrapper} key={equipamento.id_equipamento}>
                                    <Faq
                                        id_equipamento={equipamento.id_equipamento}
                                        Data={equipamento.dt_instalacao}
                                        IP={equipamento.ip}
                                        Localizacao={equipamento.localizacao}
                                        Notas={equipamento.notas}
                                        Tipo={equipamento.tipo}
                                        Status={equipamento.status}
                                    />
                                </div>
                        ))}
                        </div>
                    ) : (
                        <div className={styles.NenhumEquipamento}>
                            <p className={styles.NenhumEquipamentoTexto}>
                                Nenhum FAQ registrado.
                            </p>
                        </div>
                    )}
                </div>
            </FaqArea>
            <div className={styles.buttons}>
                <button className={styles.addButton} onClick={handleAdd}>
                    Adicionar
                </button>
            </div>
        </div>
    );
}

export default VisualizarFaq;
