import { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
        <div>
            <Toaster />
            <h1>Editar Equipamento (ID: {equipamentoId})</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Data de Instalação:
                    <input 
                        type="date" 
                        name="dt_instalacao" 
                        value={equipamento.dt_instalacao} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    IP:
                    <input 
                        type="text" 
                        name="ip" 
                        value={equipamento.ip} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Localização:
                    <input 
                        type="text" 
                        name="localizacao" 
                        value={equipamento.localizacao} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Notas:
                    <textarea 
                        name="notas" 
                        value={equipamento.notas} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Tipo:
                    <input 
                        type="text" 
                        name="tipo" 
                        value={equipamento.tipo} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Status:
                    <input 
                        type="text" 
                        name="status" 
                        value={equipamento.status} 
                        onChange={handleChange} 
                    />
                </label>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default EditarEquipamento;
