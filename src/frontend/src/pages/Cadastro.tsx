import styles from "../styles/Cadastro.module.css"

function Cadastro() {
    return (
        <div className={styles.containerCadastro}>
            <h1>Cadastro</h1>
            <form className={styles.form} action="">
                <div>
                    <label htmlFor="">Nome Completo</label> <br />
                    <input type="text" placeholder="Insira seu nome completo"/> <br />

                    <label htmlFor="">CPF</label> <br />
                    <input type="text" placeholder="Insira o seu CPF"/> <br />
                </div>

                <div>
                    <label htmlFor="">Número de telefone</label> <br />
                    <input type="text" placeholder="Insira o seu número" /> <br />

                    <label htmlFor="">Email</label> <br />
                    <input type="text" placeholder="Insira o seu email" /> <br />
                </div>

                <div>
                    <label htmlFor="">CEP</label> <br />
                    <input type="text" placeholder="Insira o seu CEP" /> <br />

                    <label htmlFor="">Rua</label> <br />
                    <input type="text" placeholder="Insira o nome da sua Rua" /> <br />

                    <label htmlFor="">Nº</label> <br />
                    <input type="text" placeholder="Insira o número da sua casa" /> <br />
                </div>

                <label htmlFor="">Senha</label> <br />
                <input type="text" placeholder="Insira sua senha" /> <br />
            </form>
            <div className={styles.containerBotoes}>
                <button className={styles.cadastrar}>Cadastrar</button>
                <button className={styles.descartar}>Descartar</button>
            </div>
        </div>
    )
}

export default Cadastro