import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/EsqueciSenha.module.css"

function NovaSenha() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/login');
    };

    return (
        <div className={styles.body}>
            <div className={styles.containerEsqueciSenha}>
                <h1>Altere a sua senha</h1>
                <form className={styles.formEsqueciSenha} action="">
                    <label htmlFor="">Nova Senha</label> <br />
                    <input type="password" placeholder="Insira a sua nova senha"/> <br />
                    <label htmlFor="">Confirme sua nova senha</label> <br />
                    <input type="password" placeholder="Digite novamente a sua senha"/> <br />
                    <Link to="/login"><button>Alterar</button></Link>
                </form>
                <p onClick={handleClick}>
                    <Link to="/esquecisenha">Voltar</Link>
                </p>
            </div>
        </div>
    )
}

export default NovaSenha