import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Tickets.module.css"
import { Navigate, useNavigate } from "react-router-dom";

function AcceptAndDeleteButton({ chamadoId }: { chamadoId: number }){
    const navigate = useNavigate()

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
                toast.success('Chamado excluído com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
                toast.success("Chamado aceito!")
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Erro ao atualizar o chamado:', error);
            toast.error("Ocorreu um erro. Tente novamente.")
        }
    }


    return (
        <div className={styles.sectionThree}>
            <Toaster />
            <button className={styles.acceptButton} onClick={() => Aceitar()}>ACEITAR</button>
            <button className={styles.deleteButton} onClick={() => onDelete()}>DELETAR</button>
        </div>
    );
}

export default AcceptAndDeleteButton