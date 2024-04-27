import { Connection } from "mysql";
import { Conecta } from "../conexao";

export class Equipamento {
    private connection: Connection;

    constructor(conexao: Conecta) {
        this.connection = conexao.connection;
    }

    async createTableEquipamento(dbName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error('Erro ao selecionar o banco de dados:', useError);
                    reject(useError);
                } else {
                    console.log('Banco de dados selecionado com sucesso!');
                    this.connection.query(`
                        CREATE TABLE IF NOT EXISTS equipamento (
                            id_equipamento INT AUTO_INCREMENT PRIMARY KEY,
                            ip VARCHAR(11),
                            localizacao VARCHAR(50),
                            dt_instalacao DATE,
                            notas VARCHAR(50),
                            tipo VARCHAR(30),
                            status VARCHAR(20),
                            id_usuario INT,
                            FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
                        );
                    `, (error, results) => {
                        if (error) {
                            console.error('Erro ao criar tabela Equipamento:', error);
                            reject(error);
                        } else {
                            console.log('Tabela Equipamento criada com sucesso!');
                            resolve();
                        }
                    });
                }
            });
        });
    }
}
