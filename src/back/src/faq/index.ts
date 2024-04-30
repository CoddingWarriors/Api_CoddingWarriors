import { Connection } from "mysql";
import { Conecta } from "../conexao";

export class Faq {
    private connection: Connection;

    constructor(conexao: Conecta) {
        this.connection = conexao.connection;
    }

    async createTableFaq(dbName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error('Erro ao selecionar o banco de dados:', useError);
                    reject(useError);
                } else {
                    console.log('Banco de dados selecionado com sucesso!');
                    this.connection.query(`
                        CREATE TABLE IF NOT EXISTS faq (
                            id_faq INT AUTO_INCREMENT PRIMARY KEY,
                            perguntas VARCHAR(100),
                            respostas VARCHAR(100),
                            id_usuario INT,
                            FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
                        );
                    `, (error, results) => {
                        if (error) {
                            console.error('Erro ao criar tabela FAQ:', error);
                            reject(error);
                        } else {
                            console.log('Tabela FAQ criada com sucesso!');
                            resolve();
                        }
                    });
                }
            });
        });
    }
}
