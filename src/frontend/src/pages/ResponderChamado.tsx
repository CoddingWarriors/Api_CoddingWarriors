import styles from "../styles/ResponderChamado.module.css"

function ResponderChamado() {
    return (
        <div className={styles.container}>
            <div className={styles.containerPerguntaExterno}>
                <h1>Chamado (ID)</h1>
                <div className={styles.containerPerguntaInterno}>
                    <div className={styles.containerInterno}>
                        <p className={styles.subtitulo}><strong>ID:</strong></p>
                        <p className={styles.conteudo}>(chamado.id aqui)</p>

                        <p className={styles.subtitulo}><strong>Assunto:</strong></p>
                        <p className={styles.conteudo}>(chamado.assunto aqui)</p>

                        <p className={styles.subtitulo}><strong>Descrição:</strong></p>
                        <p className={styles.conteudo}>(chamado.descricao aqui)</p>

                        <p className={styles.subtitulo}><strong>Imagem</strong></p>
                        <p className={styles.conteudo}>(chamado.imagem aqui)</p>
                    </div>
                </div>
            </div>
            <div className={styles.containerRespostaExterno}>
                <h1>Resposta ao chamado (ID)</h1>
                <div className={styles.containerRespostaInterno}>
                    <div className={styles.containerInterno}>
                        <p className={styles.subtitulo}><strong>ID:</strong></p>
                        <p className={styles.conteudo}>(chamado.id aqui)</p>

                        <form action="">
                            <strong><label htmlFor="">Resposta:</label></strong> <br />
                            <input type="text" className={styles.resposta} />
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.botoes}>
                <button className={styles.responder}>Responder</button>
                <button className={styles.deletar}>Deletar</button>
            </div>
        </div>
    )
}

export default ResponderChamado