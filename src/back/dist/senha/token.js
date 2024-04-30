"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const gerarTokenTemporario = (duracaoMinutos) => {
    // Define o tempo de expiração
    const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    const exp = now + (duracaoMinutos * 60); // Adiciona a duração em minutos
    // Monta o payload do token
    const payload = {
        iat: now,
        exp: exp
    };
    // Codifica o header e o payload para Base64
    const encodedHeader = Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'HS256' })).toString('base64');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    // Gera a assinatura usando HMAC-SHA256
    const key = '.net-sp-ness'; // Chave secreta
    const signature = crypto_1.default.createHmac('sha256', key)
        .update(encodedHeader + '.' + encodedPayload)
        .digest('base64');
    // Concatena header, payload e assinatura para formar o token JWT
    const token = `${encodedHeader}.${encodedPayload}.${signature}`;
    return token;
};
exports.default = gerarTokenTemporario;
// Exemplo de uso: gerar um token temporário com duração de 30 minutos
