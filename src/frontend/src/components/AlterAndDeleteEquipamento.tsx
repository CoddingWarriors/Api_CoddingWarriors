import styles from "../styles/Equipamento.module.css";
import { Toaster, toast } from 'react-hot-toast'

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
                toast.error('Erro ao excluir o equipamento.')
                throw new Error('Erro ao excluir o equipamento');
            } else {
                console.log('Equipamento excluído com sucesso!');
                toast.success("Equipamento excluído com sucesso!")
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
                <Toaster />
                <button className={styles.editButton} onClick={() => onAlterar()}>ALTERAR</button>
                <button className={styles.deleteButton} onClick={() => onDelete()}>DELETAR</button>
            </div>
    );
}

export default AlterAndDeleteEquipamento;