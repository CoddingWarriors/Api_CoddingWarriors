import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "../styles/FaqComponente.module.css";

function EditAndDeleteButtonFaq({ faqId }: { faqId: number }) {
    const navigate = useNavigate();

    const onDelete = async () => {
        try {
            const response = await fetch("http://localhost:5000/deletar-faq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ faqId: faqId }),
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o FAQ');
            } else {
                toast.success('FAQ excluído com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Erro ao excluir o FAQ:', error);
            toast.error('Erro ao excluir o FAQ');
        }
    };

    const onEdit = () => {
        navigate(`/editarfaq/${faqId}`);
    };

    return (
        <div className={styles.sectionThree}>
            <Toaster />
            <button className={styles.editButton} onClick={onEdit}>EDITAR</button>
            <button className={styles.deleteButton} onClick={onDelete}>DELETAR</button>
        </div>
    );
}

export default EditAndDeleteButtonFaq;
