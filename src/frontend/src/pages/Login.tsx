import { Link } from "react-router-dom"
import styles from "../styles/Login.module.css"

function Login() {
    return (
        <div className={styles.containerLogin}>
            <h1>Login</h1>
            <form className={styles.form} action="">
                <label htmlFor="">Email ou Cpf</label> <br />
                <input type="text" placeholder="Insira seu Login" /> <br />

                <label htmlFor="">Senha</label> <br />
                <input type="text" placeholder="Insira sua senha" /> <br />
            </form>
            <p>Esqueceu a senha?</p>
            <div className={styles.containerBotoes}>
                <button>Entrar</button>
                <button>
                    <Link to="/cadastro">Cadastre-se</Link>
                </button>
            </div>
            <button>Entrar como suporte</button>
        </div>
    )
}

export default Login