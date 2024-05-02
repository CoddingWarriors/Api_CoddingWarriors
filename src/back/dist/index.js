"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const criadb_1 = require("./criadb");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const dbName = "Ocean";
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note que 'secure' deve ser verdadeiro em produção se estiver usando HTTPS
}));
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const verificaLogin = await criadb_1.usuario.loginUsuario(dbName, username, password);
    if (verificaLogin) {
        // Use a assertiva para dizer ao TypeScript que você sabe que loggedIn existe
        req.session.loggedIn = true;
        res.status(200).json({ message: "Login bem-sucedido" });
    }
    else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});
app.get("/check-login", (req, res) => {
    // Use a assertiva para dizer ao TypeScript que você sabe que loggedIn existe
    if (req.session.loggedIn) {
        res.status(200).json({ message: "Usuário está logado" });
    }
    else {
        res.status(200).json({ message: "Usuário não está logado" });
    }
});
app.post("/cadastro", async (req, res) => {
    const { cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo, foto } = req.body;
    try {
        const verificaCadastrado = await criadb_1.usuario.cadastroUsuario(dbName, cpf, rg, nome, telefone, email, senha, endereco, numero, cep, tipo);
        if (verificaCadastrado) {
            console.log("Usuário cadastrado");
            res.status(200).send("Usuário cadastrado com sucesso");
        }
        else {
            console.log("Erro ao cadastrar usuário");
            res.status(500).send("Erro ao cadastrar usuário");
        }
    }
    catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro ao cadastrar usuário");
    }
});
app.listen(PORT, () => { });
