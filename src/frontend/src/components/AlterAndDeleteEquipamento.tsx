import { useNavigate } from "react-router-dom"
import styles from "../styles/Equipamento.module.css"

function AlterAndDeleteEquipamento({ id_equipamento }: { id_equipamento: number }) {
    const navigate = useNavigate()

    const onDelete = async () => {
        try {
            const response = await fetch("http://localhost:5000/deletar-equipamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ id_equipamento: id_equipamento }),
            })

            if (!response.ok) {
                throw new Error("Erro ao excluir o equipamento")
            } else {
                console.log("Equipamento excluído com sucesso!")
                window.location.reload()
            }
        } catch (error) {
            console.error("Erro ao excluir o equipamento:", error)
        }
    }

    // Função para redirecionar para a página de edição
    const onAlterar = () => {
        navigate(`/editar-equipamento/${id_equipamento}`)
    }

    return (
        <div className={styles.buttonContainer}>
            {/* Botão Alterar */}
            <button className={styles.editButton} onClick={() => onAlterar()}>
                ALTERAR
            </button>
            {/* Botão Deletar */}
            <button className={styles.deleteButton} onClick={() => onDelete()}>
                DELETAR
            </button>
        </div>
    )
}

export default AlterAndDeleteEquipamento
