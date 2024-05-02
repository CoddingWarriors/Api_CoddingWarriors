import express, { Request, Response } from 'express';
import cors from 'cors';
import { usuario } from './criadb';
import Chamados from './chamado/chamados';

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

app.post('/cadastro', async (req: Request, res: Response) => {
  const { cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo, foto } = req.body; // Inclua 'foto' aqui
  
  try {
    const verificaCadastrado = await usuario.cadastroUsuario(dbName, cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo, foto); // Passe 'foto' para a função
    
    if (verificaCadastrado) {
      console.log('Usuário cadastrado');
      res.status(200).send('Usuário cadastrado com sucesso');
    } else {
      console.log('Erro ao cadastrar usuário');
      res.status(500).send('Erro ao cadastrar usuário');
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

app.post('/chamado', async (req: Request, res: Response) => {
  const { id, descricao, data_inicio, data_fim, resposta, status } = req.body;

  try {
    const novoChamado = new Chamados(id, descricao, data_inicio, data_fim, resposta, status);

    res.status(200).send('Chamado criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).send('Erro ao criar chamado');
  }
});

app.listen(PORT, () => {})

function session(arg0: { secret: string; resave: boolean; saveUninitialized: boolean; cookie: { secure: boolean; }; }): any {
    throw new Error('Function not implemented.');
}
