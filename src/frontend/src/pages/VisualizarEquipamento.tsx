import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EquipamentosArea from "../components/EquipamentosArea";
import Equipamento from "../components/Equipamento";
import styles from "../styles/VisualizarEquipamento.module.css";
import { Link } from 'react-router-dom';

function VisualizarEquipamento() {
    const [equipamentos, setEquipamentos] = useState<any[]>([]);
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
        
                if (data.tipoUsuario !== '2' && data.tipoUsuario !== '3') {
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
                Equipamentos
            </h1>
            <EquipamentosArea>
                <div className={styles.equipamentosContainer}>
                    {equipamentos.length > 0 ? (
                        equipamentos.map(equipamento => (
                            <div className={styles.wrapper} key={equipamento.id_equipamento}>
                                <Equipamento
                                    id_equipamento={equipamento.id_equipamento}
                                    Data={equipamento.dt_instalacao}
                                    IP={equipamento.ip}
                                    Localizacao={equipamento.localizacao}
                                    Notas={equipamento.notas}
                                    Tipo={equipamento.tipo}
                                    Status={equipamento.status}
                                />
                            </div>
                        ))
                    ) : (
                        <div className={styles.NenhumEquipamento}>
                            <p className={styles.NenhumEquipamentoTexto}>
                                Nenhum equipamento registrado.
                            </p>
                        </div>
                    )}
                </div>
            </EquipamentosArea>
            <Link to="/cadastrarequipamentos" className={styles.addButton}>Adicionar Equipamento</Link>
        </div>
    );
}

export default VisualizarEquipamento;
