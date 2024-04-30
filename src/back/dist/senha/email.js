"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const token_1 = __importDefault(require("./token")); // Supondo que você tenha exportado a função gerarTokenTemporario de um arquivo separado
const enviarEmail = async (destinatario) => {
    // Gerar token temporário
    const token = (0, token_1.default)(30); // Gerando um token temporário com duração de 30 minutos
    // Configurações do Nodemailer
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'coddingwarriors@gmail.com',
            pass: 'ynfs anjn xzsv wlzp'
        },
    });
    // Opções do email
    const mailOptions = {
        from: "coddingwarriors@gmail.com",
        to: destinatario, // Substitua pelo endereço de e-mail do destinatário
        subject: "Redefinir Senha",
        html: `<a href="http://localhost:3000/novasenha">${token}</a>`,
    };
    try {
        // Enviando o email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ', info.response);
    }
    catch (error) {
        console.error('Erro ao enviar o email: ', error);
    }
};
// Chamando a função para enviar o email
enviarEmail('ivan.suiya@gmail.com');
exports.default = enviarEmail;
