"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const criadb_1 = require("./criadb");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const dbName = 'Ocean';
app.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Permitir apenas solicitações da origem http://localhost:3000
    methods: ['GET', 'POST'], // Permitir apenas os métodos GET e POST
    optionsSuccessStatus: 200 // Define o código de status de sucesso para as solicitações OPTIONS
};
app.use((0, cors_1.default)(corsOptions));
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const verificaLogin = await criadb_1.usuario.loginUsuario(dbName, username, password);
    if (verificaLogin) {
    }
    else {
    }
});
app.post('/cadastro', async (req, res) => {
    const { cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo, foto } = req.body; // Inclua 'foto' aqui
    try {
        const verificaCadastrado = await criadb_1.usuario.cadastroUsuario(dbName, cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo, foto); // Passe 'foto' para a função
        if (verificaCadastrado) {
            console.log('Usuário cadastrado');
            res.status(200).send('Usuário cadastrado com sucesso');
        }
        else {
            console.log('Erro ao cadastrar usuário');
            res.status(500).send('Erro ao cadastrar usuário');
        }
    }
    catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
