import styles from "../styles/Faq.module.css";
import setaBaixo from "../img/setaBaixo.png";
import setaCima from "../img/setaCima.png";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';

function Faq() {
    const [faq, setFaq] = useState<any[]>([]);
    const [selecionado, setSelecionado] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Você precisa estar logado para visualizar o FAQ.");
            return;
        }

        async function fetchFaq() {
            try {
                const response = await fetch("http://localhost:5000/get-faq", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setFaq(data);
                } else {
                    throw new Error(data.message || "Erro ao buscar FAQ");
                }
            } catch (error) {
                console.error("Erro ao buscar FAQ:", error);
                toast.error("Erro ao buscar FAQ. Por favor, tente novamente.");
            }
        }

        fetchFaq();
    }, []);

    const toggle = (i: number) => {
        if (selecionado === i) {
            return setSelecionado(null);
        }
        setSelecionado(i);
    };

    return (
        <div className={styles.containerFAQ}>
            <h1>Perguntas Frequentes (FAQ)</h1>
            <p>
                Bem-vindo à nossa seção de Perguntas Frequentes (FAQ)! Aqui você encontrará respostas para as perguntas mais comuns sobre nossos produtos/serviços.
                <br />
                Nosso objetivo é oferecer a você uma experiência tranquila e satisfatória, fornecendo informações claras e abrangentes para ajudar a resolver suas dúvidas de maneira rápida e eficiente.
            </p>
            <div className={styles.wrapper}>
                {faq.length > 0 ? (
                    <div className={styles.accordion}>
                        {faq.map((item, i) => (
                            <div className={styles.item} key={item.id_faq}>
                                <div className={styles.titulo} onClick={() => toggle(i)}>
                                    <h3>{item.perguntas}</h3>
                                    <span>
                                        {selecionado === i ? (
                                            <img src={setaCima} alt="-" />
                                        ) : (
                                            <img src={setaBaixo} alt="-" />
                                        )}
                                    </span>
                                </div>
                                <div className={selecionado === i ? styles.conteudoShow : styles.conteudo}>
                                    {item.respostas}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info" role="alert">
                        Nenhuma pergunta frequente registrada no momento.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Faq;
