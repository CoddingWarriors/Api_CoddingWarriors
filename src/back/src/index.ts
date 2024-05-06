import express, { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
import { usuario, chamado } from "./criadb"
import enviarEmail from "./DB/senha/email"
import gerarTokenTemporario from "./DB/senha/token"
import { Authentication } from "./Middleware"
import { setUsername, getUsername } from "./globalUser"

const app = express()
const PORT = process.env.PORT || 5000
const dbName = "Ocean"

app.use(express.json())

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const verificaLogin = await usuario.loginUsuario(dbName, username, password) // Verifica o login do usuário
        const id_user = await usuario.buscarUsuarioPorUsername(dbName, username) // Obtém todos os dados do usuário

        if (verificaLogin && usuario) {
            const token = Authentication.generateToken(id_user.id_usuario) // Gera o token JWT com o ID do usuário

            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: "Credenciais inválidas" })
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
})

app.post("/cadastro", async (req: Request, res: Response) => {
    const { cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo, foto } = req.body // Inclua 'foto' aqui

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
        ) // Passe 'foto' para a função

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

app.post("/abrirchamado", async (req, res) => {
    const { titulo, descricao, categoria, userId } = req.body

    try {
        await chamado.novoChamado(dbName, titulo, descricao, categoria, userId)

        console.log("Chamado criado com sucesso")
        res.status(200).send("Chamado criado com sucesso")
    } catch (error) {
        console.error("Erro ao criar chamado:", error)
        res.status(500).send("Erro ao criar chamado")
    }
})

app.post("/esquecisenha", async (req, res) => {
    const { username } = req.body
    setUsername(username)
    console.log(username)
    const token = gerarTokenTemporario(30)
    console.log(token)
    usuario.inserirToken(`${token}`, username)
    enviarEmail(username, token) // verificar onde vai mandar o email
})
app.post(`/novasenha`, async (req: Request, res: Response) => {
    const { password } = req.body
    console.log(password)
    const username = getUsername()
    console.log(username)
    const token = await usuario.pegaToken(username)
    usuario.alterarSenha(`${token}`, password)
    /* res.json({ token: token2 }); */
})

app.post("/buscar-chamados", async (req: Request, res: Response) => {
    const { userId, status } = req.body
    

    try {
        // Chama a função para buscar os chamados com base no ID do usuário e no status
        const chamados = await chamado.buscarChamadosDoUsuario(dbName, userId, status)
        console.log(chamados)
        res.status(200).json(chamados)
    } catch (error) {
        console.error("Erro ao buscar chamados:", error)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
})

// Rota para verificar a validade do token
app.post("/verificar-token", (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1] // Pega o token do header Authorization
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" })
    }

    try {
        jwt.verify(token, "secreto") // Verifica a validade do token utilizando a mesma chave secreta
        res.status(200).json({ message: "Token válido" })
    } catch (error) {
        res.status(401).json({ message: "Token inválido" })
    }
})

app.listen(PORT, () => {})
