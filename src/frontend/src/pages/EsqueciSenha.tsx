import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/EsqueciSenha.module.css"

function EsqueciSenha() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/login');
    };

    return (
        <div className={styles.body}>
            <div className={styles.containerEsqueciSenha}>
                <h1>Recupere a sua senha</h1>
                <form className={styles.formEsqueciSenha} action="">
                    <label htmlFor="">Email</label> <br />
                    <input type="text" placeholder="Insira o seu email"/> <br />
                    <button>Enviar</button>
                </form>
                <p onClick={handleClick}>
                    <Link to="/esquecisenha">Voltar</Link>
                </p>
            </div>
        </div>
    )
}

export default EsqueciSenha