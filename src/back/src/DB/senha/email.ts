import nodemailer from 'nodemailer';
 // Supondo que você tenha exportado a função gerarTokenTemporario de um arquivo separado


const enviarEmail = async (destinatario: string, token: string): Promise<void> => {
    // Gerar token temporário
    // Gerando um token temporário com duração de 30 minutos
    // depois de criar o token, criar variavel para guardar o token no banco
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
        html: `<h1>Clique abaixo para Redefinir sua Senha</h1><br><br><a href="http://localhost:3000/novasenha">Redefinir Senha</a><br><br><h3>Seu token${token}</h3>`,
    };

    try {
        // Enviando o email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ', info.response);
    } catch (error) {
        console.error('Erro ao enviar o email: ', error);
    }
};




export default enviarEmail;



