import express, { Request, Response } from 'express';
import cors from 'cors';
import { chamado, usuario } from './criadb';
import Chamados from './chamado/chamados';

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
    
  } else {
    
  }
});

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
    
    // Chamar o método para criar o chamado no banco de dados, se necessário
    // Exemplo:
    // await novoChamado.novoChamados();


    res.status(200).send('Chamado criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).send('Erro ao criar chamado');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
