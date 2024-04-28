import styles from "../styles/AbrirChamado.module.css"
import imagens from "../img/imagem.png"
import { useState } from "react"

function AbrirChamado() {
    const [nomeArquivo, setNomeArquivo] = useState('');
    const defaultImage:any = "../img/imagem.png";
    const [image, setImage] = useState(defaultImage);
  
    const handleFileChange = (event:any) => {
      const file = event.target.files[0];
      const fileName = file.name;
      setNomeArquivo(fileName);
      setImage(defaultImage);
    };

    return (
        <div className={styles.containerAbrirChamado}>
            <h1>Abrir chamado</h1>
            <p>Nos forneça detalhes sobre o problema para que possamso identificar e oferecer a melhor solução possível</p>
            <form className={styles.formAbrirChamado} action="">
                <label className={styles.labelText} htmlFor="">Título</label> <br />
                <input className={styles.inputTitulo} type="text" /> <br />

                <label className={styles.labelText} htmlFor="">Descrição</label> <br />
                <textarea className={styles.textareaDescricao} name="" id=""></textarea> <br />

                <h2 className={styles.categoriasTitulo}>Selecione a categoria</h2>


                <label htmlFor="categoria" className={styles.labelRadio}>
                    <input className={styles.inputRadio} type="radio" name="categoria" id="" />
                    <span className={styles.spanRadio}>Velocidade de internet baixa</span>
                </label> <br />

                <label className={styles.labelRadio} htmlFor="categoria">
                    <input className={styles.inputRadio} type="radio" name="categoria" id="" />
                    <span className={styles.spanRadio}>Internet instável</span>
                </label> <br />

                <label className={styles.labelRadio} htmlFor="categoria">
                    <input className={styles.inputRadio} type="radio" name="categoria" id="" />
                    <span className={styles.spanRadio}>Sem conexão de internet</span>
                </label> <br />

                <h2 className={styles.insiraImagem}>Caso seja possível, insira uma imagem demonstrando o problema</h2>
                <input className={styles.file} type="file" name="fileInput" id="fileInput" onChange={handleFileChange} />
                <label className={styles.enviarImagem} htmlFor="fileInput">
                    <img src={image} alt="" />
                    {nomeArquivo ? nomeArquivo : 'Enviar imagem'}
                </label>
            </form>
            <div className={styles.botoes}>
                <button className={styles.enviar}>Enviar</button>
                <button className={styles.descartar}>Descartar</button>
            </div>
        </div>
    )
}

export default AbrirChamado