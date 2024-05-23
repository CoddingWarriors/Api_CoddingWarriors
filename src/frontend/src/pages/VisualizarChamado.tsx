import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/VisualizarChamado.module.css";

function VisualizarChamado() {
    const { chamadoId } = useParams();
    const [chamado, setChamado] = useState({
        titulo: '',
        descricao: '',
        categoria: '',
        imagem: '' // Adicionando imagemUrl ao estado
    });

    useEffect(() => {
        async function fetchChamado() {
            try {
                const response = await fetch('http://localhost:5000/obter-informacoes-chamado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ chamadoId })
                });
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do chamado');
                }
                const dadosChamado = await response.json();
                console.log(dadosChamado);
                setChamado(dadosChamado);
            } catch (error) {
                console.error('Erro ao obter informações do chamado:', error);
            }
        }

        fetchChamado();
    }, [chamadoId]);

    return (
        <div className={styles.containerAbrirChamado}>
            <h1>Visualizar Chamado</h1>
            <p>Detalhes sobre o problema para que possamos identificar e oferecer a melhor solução possível</p>
            <form className={styles.formAbrirChamado}>
                <label className={styles.labelText} htmlFor="titulo">Título</label> <br />
                <input className={styles.inputTitulo} type="text" id="titulo" value={chamado.titulo} readOnly /> <br />

                <label className={styles.labelText} htmlFor="descricao">Descrição</label> <br />
                <textarea className={styles.textareaDescricao} id="descricao" value={chamado.descricao} readOnly /> <br />

                <h2 className={styles.categoriasTitulo}>Categoria</h2>
                <p>{chamado.categoria}</p>

                {/* Renderizando a imagem se a URL da imagem estiver disponível */}
                {chamado.imagem && (
                    <img src={chamado.imagem} alt="Imagem do chamado" className={styles.imagemChamado} />
                )}

                <div className={styles.botoes}>
                    <button type="button" className={styles.enviar}>Voltar</button>
                </div>
            </form>
        </div>
    );
}

export default VisualizarChamado;
