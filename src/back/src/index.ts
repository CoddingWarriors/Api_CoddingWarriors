import express, { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
import { usuario, chamado, equipamento, faq } from "./criadb"
import enviarEmail from "./DB/senha/email"
import gerarTokenTemporario from "./DB/senha/token"
import { Authentication } from "./Middleware"
import { setUsername, getUsername } from "./globalUser"
import multer, { StorageEngine } from 'multer';

//imagem no banco 

const storage: StorageEngine = multer.memoryStorage();
const upload = multer({ storage: storage });
// definiçoes do app
const app = express()
const PORT = process.env.PORT || 5000
const dbName = "ocean"

app.use(express.json())

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const verificaLogin = await usuario.loginUsuario(dbName, username, password); // Verifica o login do usuário
        const id_user = await usuario.buscarUsuarioPorUsername(dbName, username);

        if (id_user) {
            const now = new Date();
            const nowTime = now.toTimeString().split(' ')[0];

            if ((id_user.tipo === '2' || id_user.tipo === '3') &&
                (nowTime < id_user.horario_inicio || nowTime > id_user.horario_fim)) {
                return res.status(403).json({ message: "Você só pode acessar seu login no seu horário de trabalho" });
            }

            const token = Authentication.generateToken(id_user.id_usuario); // Gera o token JWT com o ID do usuário
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/cadastro", async (req, res) => {
    const { cpf, nome, telefone, email, senha, endereco, numero, cep, tipo, horario_inicio, horario_fim } = req.body; // Inclua 'foto' aqui

    try {
        const cpfExistente = await usuario.verificaCPF(cpf);

        // Se o CPF já estiver cadastrado, retornar um erro
        if (cpfExistente) {
            console.log("CPF já cadastrado"); // Log no servidor
            return res.status(400).json({ error: "CPF já cadastrado" }); // Enviar erro como resposta JSON
        }
        
        const emailExistente = await usuario.verificaEmail(email);
        
        // Se o email já estiver cadastrado, retornar um erro
        if (emailExistente) {
            console.log("Email já cadastrado"); // Log no servidor
            return res.status(400).json({ error: "Email já cadastrado" }); // Enviar erro como resposta JSON
        }

        // Se o CPF e o email não estiverem cadastrados, prosseguir com o cadastro do usuário
        const verificaCadastrado = await usuario.cadastroUsuario(
            dbName,
            cpf,
            nome,
            telefone,
            email,
            senha,
            endereco,
            numero,
            cep,
            tipo,
            horario_inicio,
            horario_fim,
        );

        const token = gerarTokenTemporario(30);
        const subject = 'confirmar email';
        const html = `<h1>Clique abaixo para Confirmar seu email</h1><br><br><a href="http://localhost:3000/">Confirmar</a><br><br><h3>Seu token${token}</h3>`;
        await usuario.inserirToken(token, email); // Insere o token associado ao usuário no banco de dados
        enviarEmail(email, html, subject);

        if (verificaCadastrado) {
            console.log("Usuário cadastrado");
            res.status(200).send("Usuário cadastrado com sucesso");
        } else {
            console.log("Erro ao cadastrar usuário");
            res.status(500).send("Erro ao cadastrar usuário");
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro ao cadastrar usuário");
    }
});



app.post("/abrirchamado", upload.single("imagem"), async (req: Request, res: Response) => {
    const { titulo, descricao, categoria, tempo, dataCriacao, dataFinalizacao, token } = req.body;
    const imagem = req.file;

    if (!Authentication.isValidToken(token)) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const userId = Authentication.getUserIdFromToken(token);

    if (userId === null) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        const imagemBinaria = imagem ? imagem.buffer : null;
        await chamado.novoChamado(dbName, titulo, descricao, categoria, tempo, userId, imagemBinaria, dataCriacao, dataFinalizacao);

        console.log("Chamado criado com sucesso");
        res.status(200).send("Chamado criado com sucesso");
    } catch (error) {
        console.error("Erro ao criar chamado:", error);
        res.status(500).send("Erro ao criar chamado");
    }
});

app.post("/atualizar-data-finalizacao", async (req: Request, res: Response) => {
    const { chamadoId, novaDataFinalizacao, token } = req.body;

    try {
        await chamado.atualizarDataFinalizacao(dbName, chamadoId, novaDataFinalizacao);

        console.log("Data de finalização do chamado atualizada com sucesso");
        res.status(200).json({ message: "Data de finalização do chamado atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar data de finalização do chamado:", error);
        res.status(500).json({ message: "Erro ao atualizar data de finalização do chamado" });
    }
});


app.post("/esquecisenha", async (req, res) => {
    const { username } = req.body;

    try {
        setUsername(username); // Define o nome de usuário
        console.log(username);

        const token = gerarTokenTemporario(30); // Gera um token temporário
        console.log(token);
        const subject = 'redefinir senha'
        const html = `<h1>Clique abaixo para Redefinir sua Senha</h1><br><br><a href="http://localhost:3000/">Redefinir Senha</a><br><br><h3>Seu token${token}</h3>`
        await usuario.inserirToken(token, username); // Insere o token associado ao usuário no banco de dados
        enviarEmail(username, html, subject) ; // Envie o email para o usuário com o token temporário

        res.status(200).json({ message: "Email enviado com sucesso" }); // Retorna uma mensagem de sucesso para o front-end
    } catch (error) {
        console.error("Erro ao enviar o email de redefinição de senha:", error);
        res.status(500).json({ message: "Erro ao enviar o email de redefinição de senha" }); // Retorna uma mensagem de erro para o front-end
    }
});

app.post(`/novasenha`, async (req: Request, res: Response) => {
    const { password } = req.body;

    try {
        const username = getUsername(); // Supondo que getUsername() retorne o nome de usuário associado à solicitação
        const token = await usuario.pegaToken(username); // Obtém o token associado ao usuário
        
        if (token !== null) {
            await usuario.alterarSenha(token, password); // Altera a senha usando o token
            
            // Retorna uma resposta para o front-end indicando que a senha foi alterada com sucesso
            res.status(200).json({ message: "Senha alterada com sucesso" });
        } else {
            throw new Error("Token de usuário é nulo");
        }
    } catch (error) {
        console.error("Erro ao alterar a senha:", error);
        // Em caso de erro, retorna uma resposta de erro para o front-end
        res.status(500).json({ message: "Erro ao alterar a senha" });
    }
});


app.post("/buscar-chamados", async (req: Request, res: Response) => {
    const { token, status } = req.body;

    // Verifica se o token é válido
    if (!Authentication.isValidToken(token)) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const userId = Authentication.getUserIdFromToken(token);

    // Verifica se userId é null
    if (userId === null) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        // Chama a função para buscar os chamados com base no ID do usuário e no status
        const chamados = await chamado.buscarChamadosDoUsuario(dbName, userId, status);
        res.status(200).json(chamados);
    } catch (error) {
        console.error("Erro ao buscar chamados:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/deletar-chamado", async (req: Request, res: Response) => {
    const { chamadoId } = req.body;

    try {
        await chamado.excluirChamado(dbName, chamadoId);
        res.status(200).json({ message: "Chamado deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar chamado:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/deletar-equipamento", async (req: Request, res: Response) => {
    const { id_equipamento } = req.body;

    try {
        await equipamento.excluirEquipamento(dbName, id_equipamento);
        res.status(200).json({ message: "Equipamento deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar equipamento:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/atualizar-chamado-andamento", async (req: Request, res: Response) => {
    const { chamadoId } = req.body;

    try {
        await chamado.atualizarStatusChamadoAndamento(dbName, chamadoId);
        res.status(200).json({ message: "Chamado atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar chamado:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
})

app.post("/obter-informacoes-chamado", async (req: Request, res: Response) => {
    const chamadoId: number = parseInt(req.body.chamadoId);
    console.log(chamadoId);

    try {
        const dadosChamado = await chamado.obterInformacoesChamado(dbName, chamadoId);
        res.status(200).json(dadosChamado);
    } catch (error) {
        console.error("Erro ao obter informações do chamado:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/visualizar-chamados-por-categoria", async (req: Request, res: Response) => {
    try {
        const chamadosPorCategoria = await chamado.visualizarChamadoADM(dbName);
        res.status(200).json(chamadosPorCategoria);
    } catch (error) {
        console.error("Erro ao visualizar chamados por categoria:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/visualizar-chamados-por-status", async (req: Request, res: Response) => {
    const { dbName } = req.body;

    try {
        const chamadosPorStatus = await chamado.visualizarChamadosPorStatus(dbName);
        res.status(200).json(chamadosPorStatus);
    } catch (error) {
        console.error("Erro ao visualizar chamados por status:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});


app.post("/responderchamado", async (req, res) => {
    const { resposta, chamadoId, token } = req.body;

    if (!Authentication.isValidToken(token)) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const userId = Authentication.getUserIdFromToken(token);

    if (userId === null) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        await chamado.ResponderChamado(dbName, chamadoId, resposta, userId);
        console.log("Chamado respondido com sucesso");
        res.status(200).send("Chamado respondido com sucesso");
    } catch (error) {
        console.error("Erro ao responder chamado:", error);
        res.status(500).send("Erro ao responder chamado");
    }
});



// Rota para verificar a validade do token
app.post("/verificar-token", (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1] // Pega o token do header Authorization
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

app.post("/usuariotipo", async (req: Request, res: Response) => {
    const { token } = req.body 

    if (!Authentication.isValidToken(token)) {
        return res.status(401).json({ message: "Token inválido" });
    }

    const userId = Authentication.getUserIdFromToken(token);

    // Verifica se userId é null
    if (userId === null) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        
        const usuarioEncontrado = await usuario.buscarUsuarioPorId(dbName, userId)
        console.log(usuarioEncontrado.tipo)
        if (usuarioEncontrado) {
        
            res.status(200).json({ tipoUsuario: usuarioEncontrado.tipo })
        } else {
            // Retorna uma mensagem de erro se o usuário não for encontrado
            res.status(404).json({ message: "Usuário não encontrado" })
        }
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
})

app.post("/user-info", async (req: Request, res: Response) => {
    const { token } = req.body;

    const userId = Authentication.getUserIdFromToken(token);

    if (!userId) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        const userDetails = await usuario.buscarUsuarioPorId(dbName, userId);

        if (!userDetails) {
            return res.status(404).json({ message: "Detalhes do usuário não encontrados" });
        }

        // Return the user details
        return res.status(200).json(userDetails);
    } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/buscar-chamados-por-status", async (req: Request, res: Response) => {
    const { status } = req.body 

    try {
        
        const chamados = await chamado.buscarChamadoPorStatus(dbName, status)
        res.status(200).json(chamados)
    } catch (error) {
        console.error("Erro ao buscar chamados por status:", error)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
})

app.get("/get-equipamentos", async (req: Request, res: Response) => {
    try {
        const equipamentos = await equipamento.buscarTodosEquipamentos(dbName);
        res.status(200).json(equipamentos);
    } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.post("/buscar-equipamento", async (req: Request, res: Response) => {
    const { id_equipamento } = req.body;


    try {
        const equipamentoEncontrado = await equipamento.buscarEquipamentoPorId(dbName, id_equipamento);
        
        if (!equipamentoEncontrado) {
            return res.status(404).send("Equipamento não encontrado");
        }

        res.status(200).json(equipamentoEncontrado);
    } catch (error) {
        console.error("Erro ao buscar equipamento:", error);
        res.status(500).send("Erro ao buscar equipamento");
    }
});

app.post("/cadastrar-equipamento", async (req: Request, res: Response) => {
    const { ip, localizacao, notas, tipo, status, cpf } = req.body;

    try {
        const userExists = await usuario.buscarUsuarioPorCpf(dbName, cpf); // Supondo que essa função verifica se o usuário existe pelo CPF

        if (!userExists) {
            res.status(404).send("Usuário não encontrado");
            return;
        }

        await equipamento.cadastrarEquipamento(dbName, ip, localizacao, notas, tipo, status, cpf);
        console.log("Equipamento cadastrado com sucesso");
        res.status(200).send("Equipamento cadastrado com sucesso");
    } catch (error) {
        console.error("Erro ao cadastrar equipamento:", error);
        res.status(500).send("Erro ao cadastrar equipamento");
    }
});

app.put("/atualizar-equipamento", async (req: Request, res: Response) => {
    const { id_equipamento, ip, localizacao, dt_instalacao, notas, tipo, status, cpf_usuario } = req.body;

    try {
        const userExists = await usuario.buscarUsuarioPorCpf(dbName, cpf_usuario);

        if (!userExists) {
            return res.status(404).send("Usuário não encontrado");
        }

        await equipamento.atualizarEquipamento(dbName, id_equipamento, ip, localizacao, dt_instalacao, notas, tipo, status, cpf_usuario);
        console.log("Equipamento atualizado com sucesso");
        res.status(200).send("Equipamento atualizado com sucesso");
    } catch (error) {
        console.error("Erro ao atualizar equipamento:", error);
        res.status(500).send("Erro ao atualizar equipamento");
    }
});

app.post("/cadastrosuporte", async (req, res) => {
    const { cpf, nome, telefone, email, senha, endereco, numero, cep, tipo, horario_inicio, horario_fim } = req.body;

    // Verificação de CPF e Email existentes
    try {
        const cpfExistente = await usuario.verificaCPF(cpf);
        if (cpfExistente) {
            console.log("CPF já cadastrado");
            return res.status(400).json({ error: "CPF já cadastrado" });
        }

        const emailExistente = await usuario.verificaEmail(email);
        if (emailExistente) {
            console.log("Email já cadastrado");
            return res.status(400).json({ error: "Email já cadastrado" });
        }

        // Cadastro de Usuário
        const verificaCadastrado = await usuario.cadastroUsuario(
            dbName,
            cpf,
            nome,
            telefone,
            email,
            senha,
            endereco,
            numero,
            cep,
            tipo,
            horario_inicio,
            horario_fim,
        );

        if (verificaCadastrado) {
            console.log("Usuário cadastrado com sucesso!");
            res.status(200).send("Usuário cadastrado com sucesso");
        } else {
            console.log("Erro ao cadastrar usuário");
            res.status(500).send("Erro ao cadastrar usuário");
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro ao cadastrar usuário");
    }
});

app.post("/cadastrar-faq", async (req: Request, res: Response) => {
    const { pergunta, resposta } = req.body;

    try {
        await faq.cadastroFaq(dbName, pergunta, resposta);
        console.log("FAQ cadastrado com sucesso");
        res.status(200).send("FAQ cadastrado com sucesso");
    } catch (error) {
        console.error("Erro ao cadastrar FAQ:", error);
        res.status(500).send("Erro ao cadastrar FAQ");
    }
});


app.get("/get-faq", async (req: Request, res: Response) =>{
   
    try{
        const faqs = await faq.buscarfaq(dbName);
        res.status(200).json(faqs);

    }
    catch (error) {
        console.log("Erro ao buscar Faqs: ", error);
        res.status(500).json({ message: "Erro interno do servidor"});
    }
});


app.post('/buscar-faq', async (req, res) => {
    const { id_faq } = req.body;

    if (!id_faq) {
        return res.status(400).json({ message: 'ID do FAQ não fornecido' });
    }

    try {
        const result = await faq.buscarFaqPorId('ocean', id_faq);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao buscar o FAQ:', error);
        res.status(500).json({ message: 'Erro ao buscar o FAQ' });
    }
});



app.put('/editarfaq', async (req, res) => {
    console.log('Request body:', req.body);
    const { id_faq, perguntas, respostas } = req.body;

    if (!id_faq || !perguntas || !respostas) {
        return res.status(400).json({ message: 'Dados insuficientes para editar FAQ' });
    }

    try {
        await faq.atualizarFaq('ocean', id_faq, perguntas, respostas);
        res.status(200).json({ message: 'FAQ editado com sucesso' });
    } catch (error) {
        console.error('Erro ao editar o FAQ:', error);
        res.status(500).json({ message: 'Erro ao editar o FAQ' });
    }
});



app.put("/editarperfil", async (req: Request, res: Response) => {
    const { cpf, nome, email, senha, telefone, endereco, numero, cep } = req.body;

    try {
        await usuario.atualizarUsuario(dbName, cpf, nome, email, senha, telefone, cep, endereco, numero);
        console.log("Usuário atualizado com sucesso");
        res.status(200).send("Usuário atualizado com sucesso");
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).send("Erro ao atualizar usuário");
    }
});

app.post('/deletar-faq', async (req, res) => {
    const { faqId } = req.body;

    if (!faqId) {
        return res.status(400).json({ message: 'ID do FAQ não fornecido' });
    }

    try {
        await faq.excluirFaq('ocean', faqId);
        res.status(200).json({ message: 'FAQ excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir o FAQ:', error);
        res.status(500).json({ message: 'Erro ao excluir o FAQ' });
    }
});


app.put("/editar-foto", upload.single('imagem'), async (req: Request, res: Response) => {
    const foto = req.file ? req.file.buffer : null;
    const { cpf } = req.body;

    try {
        await usuario.atualizaFotoUsuario(dbName, foto, cpf);
        const usuarioAtualizado = await usuario.buscarUsuarioPorCpf(dbName, cpf);
        console.log("Foto atualizada com sucesso");
        res.status(200).json({ message: "Foto atualizada com sucesso", foto: usuarioAtualizado.foto });
    } catch (error) {
        console.error("Erro ao atualizar foto:", error);
        res.status(500).send("Erro ao atualizar foto");
    }
});




app.listen(PORT, () => {})
