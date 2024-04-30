"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamado = void 0;
class Chamado {
    connection;
    constructor(conexao) {
        this.connection = conexao.connection;
    }
    async createTableChamado(dbName) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error('Erro ao selecionar o banco de dados:', useError);
                    reject(useError);
                }
                else {
                    console.log('Banco de dados selecionado com sucesso!');
                    this.connection.query(`
                        CREATE TABLE IF NOT EXISTS chamado (
                            id_chamado INT AUTO_INCREMENT PRIMARY KEY,
                            descricao VARCHAR(100),
                            dt_inicio DATE,
                            dt_fim DATE,
                            respostas VARCHAR(100),
                            status VARCHAR(30),
                            id_usuario INT,
                            id_suporte INT,
                            FOREIGN KEY (id_suporte) REFERENCES usuario(id_usuario),
                            FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
                        );
                    `, (error, results) => {
                        if (error) {
                            console.error('Erro ao criar tabela Chamado:', error);
                            reject(error);
                        }
                        else {
                            console.log('Tabela Chamado criada com sucesso!');
                            resolve();
                        }
                    });
                }
            });
        });
    }
}
exports.Chamado = Chamado;
