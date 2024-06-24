import { Connection } from "mysql"
import { Conecta } from "../../conexao"

export class Equipamento {
    private connection: Connection

    constructor(conexao: Conecta) {
        this.connection = conexao.connection
    }

    async createTableEquipamento(dbName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useErro, useResults) => {
                if (useErro) {
                    console.error("Erro ao selecionar o banco de dados:", useErro);
                    reject(useErro);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `CREATE TABLE IF NOT EXISTS equipamento (
                            id_equipamento INT AUTO_INCREMENT PRIMARY KEY,
                            ip VARCHAR(15),
                            localizacao VARCHAR(50),
                            dt_instalacao DATE,
                            notas VARCHAR(250),
                            tipo ENUM('Modem', 'Roteador', 'Switch') NOT NULL,
                            status ENUM('Ativo', 'Inativo') NOT NULL,
                            cpf_usuario VARCHAR(11),
                            FOREIGN KEY (cpf_usuario) REFERENCES usuario(cpf)
                        );`,
                        (createErro, createResults) => {
                            if (createErro) {
                                console.error("Erro ao criar a tabela equipamento:", createErro);
                                reject(createErro);
                            } else {
                                console.log("Tabela equipamento criada com sucesso!");
                                resolve();
                            }
                        }
                    );
                }
            });
        });
    }
    

    async cadastrarEquipamento(
        dbName: string,
        ip: string,
        localizacao: string,
        notas: string,
        tipo: string,
        status: string,
        cpf: string
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        INSERT INTO equipamento 
                            (ip, localizacao, dt_instalacao, notas, tipo, status, cpf_usuario)  
                            VALUES (?, ?, CURRENT_DATE(), ?, ?, ?, ?);
                        `,
                        [ip, localizacao, notas, tipo, status, cpf],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao cadastrar equipamento:", error)
                                reject(error)
                            } else {
                                console.log("Equipamento cadastrado com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async buscarTodosEquipamentos(dbName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM equipamento`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar equipamentos:", error)
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                }
            })
        })
    }

    async excluirEquipamento(dbName: string, id_equipamento: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        DELETE FROM equipamento
                        WHERE id_equipamento = ?
                        `,
                        [id_equipamento],
                        (error) => {
                            if (error) {
                                console.error("Erro ao excluir o equipamento:", error)
                                reject(error)
                            } else {
                                console.log("Equipamento excluído com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }
    
    async atualizarEquipamento(
        dbName: string,
        id_equipamento: number,
        ip: string,
        localizacao: string,
        dt_instalacao: string,
        notas: string,
        tipo: string,
        status: string,
        cpf: string
    ): Promise<{ affectedRows: number }> { // Atualize o tipo de retorno para incluir affectedRows
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `
                        UPDATE equipamento
                        SET ip = ?, localizacao = ?, dt_instalacao = ?, notas = ?, tipo = ?, status = ?, cpf_usuario = ?
                        WHERE id_equipamento = ?;
                        `,
                        [ip, localizacao, dt_instalacao, notas, tipo, status, cpf, id_equipamento],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar equipamento:", error);
                                reject(error);
                            } else {
                                console.log("Equipamento atualizado com sucesso!");
                                resolve(results); // Resolva com o resultado da consulta, que inclui affectedRows
                            }
                        }
                    );
                }
            });
        });
    }
    
    

    async buscarEquipamentoPorId(dbName: string, id_equipamento: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `SELECT * FROM equipamento WHERE id_equipamento = ?`,
                        [id_equipamento],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar equipamento:", error)
                                reject(error)
                            } else {
                                resolve(results[0])
                            }
                        }
                    )
                }
            })
        })
    }
}
