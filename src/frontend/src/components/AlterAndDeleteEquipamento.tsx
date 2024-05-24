import styles from "../styles/Equipamento.module.css";

function AlterAndDeleteEquipamento({ id_equipamento }: { id_equipamento: number }) {
    const onDelete = async () => {
        try {
            const response = await fetch("http://localhost:5000/deletar-equipamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ id_equipamento: id_equipamento }),
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o equipamento');
            } else {
                console.log('Equipamento excluído com sucesso!');
                window.location.reload();
            }
        } catch (error) {
            console.error('Erro ao excluir o equipamento:', error);
        }
    }

    const onAlterar = async () => {
        // Implemente a lógica para alterar o equipamento aqui
    }

    return (
        <div className={styles.buttonContainer}>
            <button className={styles.editButton} onClick={() => onAlterar()}>ALTERAR</button>
            <button className={styles.deleteButton} onClick={() => onDelete()}>DELETAR</button>
        </div>
    );
}

export default AlterAndDeleteEquipamento;