import styles from "../styles/Tickets.module.css"

function AcceptAndDeleteButton({ chamadoId }: { chamadoId: number }){
    const onDelete = async () => {
        try {
            const response = await fetch("http://localhost:5000/deletar-chamado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ chamadoId: chamadoId }),
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o chamado');
            } else {
                console.log('Chamado excluído com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao excluir o chamado:', error);
        }
    }

    return (
        <div className={styles.sectionThree}>
            <button className={styles.acceptButton}>ACEITAR</button>
            <button className={styles.deleteButton} onClick={() => onDelete()}>DELETAR</button>
        </div>
    );
}

export default AcceptAndDeleteButton