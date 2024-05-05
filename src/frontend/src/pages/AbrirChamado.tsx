import React, { useState, FormEvent } from "react";
import styles from "../styles/AbrirChamado.module.css";

function AbrirChamado() {
    const [nomeArquivo, setNomeArquivo] = useState('');
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const defaultImage = "../img/imagem.png";
    const [image, setImage] = useState(defaultImage);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileName = file.name;
            setNomeArquivo(fileName);
            setImage(defaultImage);
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/abrirchamado", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo,
                    descricao,
                    categoria: categoriaSelecionada,
                    imagem: nomeArquivo
                })
            });

            const responseData = await response.json();
            console.log(responseData);

        } catch (error) {
            console.log("Erro ao abrir um novo chamado", error);
            alert("Erro ao abrir um novo chamado");
        }
    }

    return (
        <div className={styles.containerAbrirChamado}>
            <h1>Abrir chamado</h1>
            <p>Nos forneça detalhes sobre o problema para que possamso identificar e oferecer a melhor solução possível</p>
            <form className={styles.formAbrirChamado} onSubmit={handleSubmit}>
                <label className={styles.labelText} htmlFor="titulo">Título</label> <br />
                <input className={styles.inputTitulo} type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} /> <br />

                <label className={styles.labelText} htmlFor="descricao">Descrição</label> <br />
                <textarea className={styles.textareaDescricao} id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} /> <br />

                <h2 className={styles.categoriasTitulo}>Selecione a categoria</h2>

                <label htmlFor="categoria-baixa" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-baixa" value="baixa" checked={categoriaSelecionada === 'baixa'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                    <span className={styles.spanRadio}>Velocidade de internet baixa</span>
                </label> <br />

                <label htmlFor="categoria-instavel" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-instavel" value="instavel" checked={categoriaSelecionada === 'instavel'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                    <span className={styles.spanRadio}>Internet instável</span>
                </label> <br />

                <label htmlFor="categoria-sem-conexao" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-sem-conexao" value="sem-conexao" checked={categoriaSelecionada === 'sem-conexao'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                    <span className={styles.spanRadio}>Sem conexão de internet</span>
                </label> <br />

                <h2 className={styles.insiraImagem}>Caso seja possível, insira uma imagem demonstrando o problema</h2>
                <input className={styles.file} type="file" name="fileInput" id="fileInput" onChange={handleFileChange} />
                <label className={styles.enviarImagem} htmlFor="fileInput">
                    {<img src={image} alt="" />}
                    {nomeArquivo ? nomeArquivo : 'Enviar imagem'}
                </label>

                <div className={styles.botoes}>
                    <button type="submit" className={styles.enviar}>Enviar</button>
                    <button type="button" className={styles.descartar}>Descartar</button>
                </div>
            </form>
        </div>
    );
}

export default AbrirChamado;
