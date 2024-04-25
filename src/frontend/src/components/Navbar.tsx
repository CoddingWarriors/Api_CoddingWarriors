import { Link } from "react-router-dom"
import logo from "../img/logo.png"
import styles from "../styles/Navbar.module.css"


function Navbar() {
    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <ul className={styles.links}>
                <li className={styles.item}>
                    <Link to="/">Página Inicial</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/atendimento">Atendimento</Link>
                </li>
                 <li className={styles.item}>
                    <Link to="/faq">FAQ</Link> 
                </li>
                <button className={styles.login}>
                    <Link to="/login">Login</Link>
                </button>
            </ul>
        </nav>
    )
}

export default Navbar