import express, { Request, Response } from "express"
import cors from "cors"
import session, { Session } from "express-session"
import { usuario } from "./criadb"

const app = express()
const PORT = process.env.PORT || 5000
const dbName = "Ocean"

app.use(express.json())

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Note que 'secure' deve ser verdadeiro em produção se estiver usando HTTPS
    })
)

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body
    const verificaLogin = await usuario.loginUsuario(dbName, username, password)
    if (verificaLogin) {
        // Use a assertiva para dizer ao TypeScript que você sabe que loggedIn existe
        (req.session as any).loggedIn = true
        res.status(200).json({ message: "Login bem-sucedido" })
        res.render("http://localhost:3000/home")
    } else {
        res.status(401).json({ message: "Credenciais inválidas" })
    }
})

app.get("/check-login", (req: Request, res: Response) => {
    // Use a assertiva para dizer ao TypeScript que você sabe que loggedIn existe
    if ((req.session as any).loggedIn) {
        res.status(200).json({ message: "Usuário está logado" })
    } else {
        res.status(200).json({ message: "Usuário não está logado" })
    }
})

app.post("/cadastro", async (req: Request, res: Response) => {
    const { cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo, foto } = req.body

    try {
        const verificaCadastrado = await usuario.cadastroUsuario(
            dbName,
            cpf,
            rg,
            nome,
            telefone,
            email,
            senha,
            endereco,
            numero,
            cep,
            tipo,
            foto
        )

        if (verificaCadastrado) {
            console.log("Usuário cadastrado")
            res.status(200).send("Usuário cadastrado com sucesso")
        } else {
            console.log("Erro ao cadastrar usuário")
            res.status(500).send("Erro ao cadastrar usuário")
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error)
        res.status(500).send("Erro ao cadastrar usuário")
    }
})

app.listen(PORT, () => {})