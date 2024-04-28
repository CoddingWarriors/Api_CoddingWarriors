import { Link } from "react-router-dom"
import styles from "../styles/Login.module.css"

function Login() {
    return (
        <div className={styles.body}>
            <div className={styles.containerLogin}>
                <h1>Login</h1>
                <form className={styles.form} action="">
                    <label htmlFor="">Email ou Cpf</label> <br />
                    <input type="text" placeholder="Insira seu Login" /> <br />

                    <label htmlFor="">Senha</label> <br />
                    <input type="text" placeholder="Insira sua senha" /> <br />
                    
                    <p className={styles.esquecisenha}>
                        <Link to="/esquecisenha">Esqueceu a senha?</Link>
                    </p>
                </form>
                    <button className={styles.botaoEntrar}>Entrar</button> <br />
                    <p className={styles.linkCadastrar}>Ou <Link to="/cadastro">cadastre-se</Link></p>
            </div>
        </div>
    )
}

export default Login