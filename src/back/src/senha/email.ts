import nodemailer from 'nodemailer';
import gerarTokenTemporario from './token'; // Supondo que você tenha exportado a função gerarTokenTemporario de um arquivo separado


const enviarEmail = async (destinatario: string): Promise<void> => {
    // Gerar token temporário
    const token = gerarTokenTemporario(30); // Gerando um token temporário com duração de 30 minutos

    // Configurações do Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'coddingwarriors@gmail.com',
            pass: 'ynfs anjn xzsv wlzp'
        },
    });

    // Opções do email
    const mailOptions: nodemailer.SendMailOptions = {
        from: "coddingwarriors@gmail.com",
        to: destinatario, // Substitua pelo endereço de e-mail do destinatário
        subject: "Redefinir Senha",
        html: `<a href="http://localhost:3000/novasenha">${token}</a>`,
    };

    try {
        // Enviando o email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ', info.response);
    } catch (error) {
        console.error('Erro ao enviar o email: ', error);
    }
};

// Chamando a função para enviar o email
enviarEmail('ivan.suiya@gmail.com');



export default enviarEmail;


