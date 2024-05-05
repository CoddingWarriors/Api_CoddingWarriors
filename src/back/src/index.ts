import express, { Request, Response } from "express"
import jwt from "jsonwebtoken";
import cors from "cors"
import { usuario } from "./criadb"
import enviarEmail from "./DB/senha/email"
import gerarTokenTemporario from "./DB/senha/token"
import { Authentication } from "./Middleware"
import { setUsername, getUsername } from "./globalUser";
import chamadoCliente from "./DB/chamado/chamadoCliente";

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
  const verificaLogin = await usuario.loginUsuario(dbName, username, password)

  if (verificaLogin) {
      const token = Authentication.generateToken(username); // Gera o token JWT

      res.status(200).json({token});
  } else {
      res.status(401)
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
    const { titulo, descricao, categoria, status } = req.body

    try {
        const novoChamado = new chamadoCliente(titulo, descricao, categoria, new Date(), status)

        console.log("Novo chamado:", novoChamado)
        res.status(200).send("Chamado criado com sucesso")
    } catch (error) {
        console.error("Erro ao criar chamado:", error)
        res.status(500).send("Erro ao criar chamado")
    }
})


app.post("/esquecisenha", async (req, res) => {
    const { username } = req.body;
    setUsername(username);
    const token = gerarTokenTemporario(30);
    usuario.inserirToken(username, token);
    enviarEmail(username, token); // verificar onde vai mandar o email
});

app.post(`/novasenha`, async (req: Request, res: Response) => {
    const { password } = req.body;
    const username = getUsername(); // Obtenha o nome de usuário usando a função getUsername
    const token2 = usuario.pegaToken(username); // Use o nome de usuário obtido
    usuario.alterarSenha(password, `${token2}`);
    res.json({ token: token2 });

    return "/novasenha";
});

// Rota para verificar a validade do token
app.post("/verificar-token", (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]; // Pega o token do header Authorization

  if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
      jwt.verify(token, "secreto"); // Verifica a validade do token utilizando a mesma chave secreta
      res.status(200).json({ message: "Token válido" });
  } catch (error) {
      res.status(401).json({ message: "Token inválido" });
  }
});

app.listen(PORT, () => {})
