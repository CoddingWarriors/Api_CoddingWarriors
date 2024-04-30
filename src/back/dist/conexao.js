"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conecta = void 0;
const mysql_1 = require("mysql");
class Conecta {
    connection;
    constructor() {
        this.connection = (0, mysql_1.createConnection)({
            host: "localhost",
            user: "root",
            password: "fatec",
        });
    }
    connectToOcean(callback) {
        this.connection.connect((err) => {
            if (err) {
                console.error("Erro ao conectar ao MySQL:", err);
                throw err;
            }
            console.log("Conexão bem sucedida ao MySQL. Criando o banco de dados Ocean...");
            this.createOceanDatabase(callback);
        });
    }
    createOceanDatabase(callback) {
        this.connection.query("CREATE DATABASE IF NOT EXISTS Ocean", (err) => {
            if (err) {
                console.error("Erro ao criar o banco de dados Ocean:", err);
                throw err;
            }
            console.log("Banco de dados Ocean criado com sucesso");
            // Atualiza a conexão para usar o banco de dados 'Ocean'
            this.connection = (0, mysql_1.createConnection)({
                host: "localhost",
                user: "root",
                password: "fatec",
                database: "Ocean",
            });
            // Chama o callback passando a conexão atualizada
            callback();
        });
    }
}
exports.Conecta = Conecta;
