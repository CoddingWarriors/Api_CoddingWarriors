import { Connection } from "mysql"
import { Conecta } from "../../conexao"

export class Faq {
    private connection: Connection

    constructor(conexao: Conecta) {
        this.connection = conexao.connection
    }

    async createTableFaq(dbName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        CREATE TABLE IF NOT EXISTS faq (
                            id_faq INT AUTO_INCREMENT PRIMARY KEY,
                            perguntas VARCHAR(100),
                            respostas VARCHAR(100)
                        );
                    `,
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao criar tabela FAQ:", error)
                                reject(error)
                            } else {
                                console.log("Tabela FAQ criada com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async cadastroFaq(dbName: string, pergunta: string, resposta: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        INSERT INTO faq 
                            (perguntas, respostas)  
                            VALUES (?, ?);
                        `,
                        [pergunta, resposta],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao cadastrar faq:", error)
                                reject(error)
                            } else {
                                console.log("Faq cadastrado com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }


    async buscarfaq(dbName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM faq`, (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar faq:", error)
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    })
                }
            })
        }
        )
    }

    async excluirFaq(dbName: string, id_faq: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        DELETE FROM faq
                        WHERE id_faq = ?
                        `,
                        [id_faq],
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

    async buscarFaqPorId(dbName: string, id_faq: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM faq WHERE id_faq = ?`,
                        [id_faq],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar faq:", error)
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

    async atualizarFaq(
        dbName: string,
        id_faq: number,
        perguntas: string,
        respostas: string
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
                        UPDATE faq
                        SET perguntas = ?, respostas = ? WHERE id_faq = ?;`,
                        [perguntas, respostas, id_faq],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar faq:", error)
                                reject(error)
                            } else {
                                console.log("Faq atualizado com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

}



