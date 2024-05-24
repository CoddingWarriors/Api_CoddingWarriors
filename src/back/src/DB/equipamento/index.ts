import { Connection } from "mysql"
import { Conecta } from "../../conexao"

export class Equipamento {
    private connection: Connection

    constructor(conexao: Conecta) {
        this.connection = conexao.connection
    }

    async createTableEquipamento(dbName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
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
                    `,
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao criar tabela Equipamento:", error)
                                reject(error)
                            } else {
                                console.log("Tabela Equipamento criada com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async cadastrarEquipamento(dbName: string, ip: string, localizacao: string, notas: string, tipo: string, status: string, userId: number): Promise<void> {
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
                            (ip, localizacao, dt_instalacao, notas, tipo, status, id_usuario)  
                            VALUES (?, ?, CURRENT_DATE(), ?, ?, ?, ?);
                        `,
                        [ip, localizacao, notas, tipo, status, userId],
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
                    this.connection.query(
                        `SELECT * FROM equipamento`,
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar equipamentos:", error)
                                reject(error)
                            } else {
                                resolve(results)
                            }
                        }
                    )
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
}
