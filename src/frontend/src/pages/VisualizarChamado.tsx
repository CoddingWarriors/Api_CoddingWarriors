import { useEffect, useState } from "react";
import styles from "../styles/VisualizarChamado.module.css"

function VisualizarChamado() {
    const [chamado, setChamado] = useState({
        titulo: '',
        descricao: '',
        categoria: ''
    });

    useEffect(() => {
        async function fetchChamado() {
            try {
                const response = await fetch('http://localhost:5000/obter-informacoes-chamado/${chamadoId}');
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do chamado');
                }
                const dadosChamado = await response.json();
                setChamado(dadosChamado);
            } catch (error) {
                console.error('Erro ao obter informações do chamado:', error);
            }
        }

        fetchChamado();
    }, []);


    return (
        <div className={styles.containerAbrirChamado}>
            <h1>Abrir chamado</h1>
            <p>Nos forneça detalhes sobre o problema para que possamos identificar e oferecer a melhor solução possível</p>
            <form className={styles.formAbrirChamado}>
                <label className={styles.labelText} htmlFor="titulo">Título</label> <br />
                <input className={styles.inputTitulo} type="text" id="titulo" placeholder={chamado.titulo} /> <br />

                <label className={styles.labelText} htmlFor="descricao">Descrição</label> <br />
                <textarea className={styles.textareaDescricao} id="descricao" placeholder={chamado.descricao} /> <br />

                <h2 className={styles.categoriasTitulo}>Selecione a categoria</h2>

                <label htmlFor="categoria-baixa" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-baixa" value="Velocidade de internet baixa" />
                    <span className={styles.spanRadio}>Velocidade de internet baixa</span>
                </label> <br />

                <label htmlFor="categoria-instavel" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-instavel" value="Internet instável" />
                    <span className={styles.spanRadio}>Internet instável</span>
                </label> <br />

                <label htmlFor="categoria-sem-conexao" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-sem-conexao" value="Sem conexão de internet" />
                    <span className={styles.spanRadio}>Sem conexão de internet</span>
                </label> <br />

                <div className={styles.botoes}>
                    <button type="submit" className={styles.enviar}>Enviar</button>
                    <button type="button" className={styles.descartar}>Descartar</button>
                </div>
            </form>
        </div>
    );
}

export default VisualizarChamado;