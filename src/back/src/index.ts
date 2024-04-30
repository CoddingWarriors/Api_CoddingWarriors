import express, { Request, Response } from 'express';
import cors from 'cors';
import { usuario } from './criadb';

const app = express();
const PORT = process.env.PORT || 5000;
const dbName = 'Ocean';

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Permitir apenas solicitações da origem http://localhost:3000
  methods: ['GET', 'POST'], // Permitir apenas os métodos GET e POST
  optionsSuccessStatus: 200 // Define o código de status de sucesso para as solicitações OPTIONS
};

app.use(cors(corsOptions));

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const verificaLogin = await usuario.loginUsuario(dbName, username, password)
  if (verificaLogin) {
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
