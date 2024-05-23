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

    const Aceitar = async () => {
        try {
            const response = await fetch("http://localhost:5000/atualizar-chamado-andamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ chamadoId: chamadoId }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o chamado');
            } else {
                console.log('Chamado atualizado com sucesso!');
                alert("Chamado aceito!")
            }
        } catch (error) {
            console.error('Erro ao atualizar o chamado:', error);
            alert("Erro")
        }
    }


    return (
        <div className={styles.sectionThree}>
            <button className={styles.acceptButton} onClick={() => Aceitar()}>ACEITAR</button>
            <button className={styles.deleteButton} onClick={() => onDelete()}>DELETAR</button>
        </div>
    );
}

export default AcceptAndDeleteButton