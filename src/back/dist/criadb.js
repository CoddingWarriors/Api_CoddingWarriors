"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipamento = exports.chamado = exports.faq = exports.usuario = exports.conexao = void 0;
const conexao_1 = require("./conexao");
const usuario_1 = require("./ususario/usuario");
const faq_1 = require("./faq/faq");
const chamado_1 = require("./chamado/chamado");
const equipamento_1 = require("./equipamento/equipamento");
const dbName = 'Ocean';
const conexao = new conexao_1.Conecta();
exports.conexao = conexao;
// instancia as classes
const usuario = new usuario_1.Usuario(conexao);
exports.usuario = usuario;
const faq = new faq_1.Faq(conexao);
exports.faq = faq;
const chamado = new chamado_1.Chamado(conexao);
exports.chamado = chamado;
const equipamento = new equipamento_1.Equipamento(conexao);
exports.equipamento = equipamento;
// roda os metodos de criação
conexao.connectToOcean(() => {
    usuario.createTableUsuario(dbName)
        .then(() => {
        return faq.createTableFaq(dbName); // Retorna uma Promise para encadear a próxima operação
    })
        .then(() => {
        return equipamento.createTableEquipamento(dbName);
    })
        .then(() => {
        return chamado.createTableChamado(dbName);
    })
        .then(() => {
        console.log('Tabelas criadas com sucesso!');
    })
        .catch((error) => {
        console.error('Erro ao criar tabelas:', error);
    });
});
