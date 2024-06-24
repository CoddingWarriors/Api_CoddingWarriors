import logo from "../img/logo.png"
import styles from "../styles/Footer.module.css"

function Footer(){
    return (
        <div className={styles.conatinerFooter}>
            <footer className={styles.footer}>
                <img src={logo} alt="" />
                <div className={styles.contatosFooter}>
                    <h1>Contato</h1>
                    <p><strong>Email: </strong>josecarlos@skype.com</p>
                    <p><strong>Telefone: </strong> (12) 99129-4901</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer