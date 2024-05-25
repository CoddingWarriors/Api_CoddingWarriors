import { Connection } from "mysql"
import { Conecta } from "../../conexao"

export class Usuario {
    private connection: Connection

    constructor(conexao: Conecta) {
        this.connection = conexao.connection
    }
    async createTableUsuario(dbName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useErro, useResults) => {
                if (useErro) {
                    console.error("Erro ao selecionar o banco de dados:", useErro)
                    reject(useErro)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `create table if not exists usuario(
                        id_usuario int auto_increment primary key,
                        cpf varchar(11), nome varchar(50),
                        telefone varchar(14), email varchar(30), senha varchar(10),
                        endereco varchar(50), numero int, cep varchar(8), token varchar(250), tipo varchar(1), horario varchar(50)
                        );`,
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao criar a tabela:", error)
                                reject(error)
                            } else {
                                console.log("Tabela crida com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async loginUsuario(dbName: string, credencial: string, senha: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useErro, useResults) => {
                if (useErro) {
                    console.error("Erro ao selecionar o banco de dados:", useErro)
                    reject(useErro)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `SELECT * 
                        FROM usuario 
                        WHERE (email = ? OR cpf = ?) 
                        AND senha = ?;`,
                        [credencial, credencial, senha],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar usuário:", error)
                                reject(error)
                            } else {
                                if (results.length > 0) {
                                    console.log("Usuário encontrado:", results[0])
                                    resolve(true) // Usuário encontrado
                                } else {
                                    console.log("Usuário não encontrado")
                                    resolve(false) // Usuário não encontrado
                                }
                            }
                        }
                    )
                }
            })
        })
    }

    async cadastroUsuario(
        dbName: string,
        cpf: number,
        nome: string,
        telefone: string,
        email: string,
        senha: string,
        endereco: string,
        numero: number,
        cep: string,
        tipo: number,
        horario: string,
        foto: any
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    // Use placeholders (?) para os valores e passe-os como um array na query
                    this.connection.query(
                        `INSERT INTO usuario (
                            cpf, nome, telefone, email, senha, endereco, numero, cep, tipo, horario
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                        [cpf, nome, telefone, email, senha, endereco, numero, cep, tipo, horario],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao cadastrar usuário:", error)
                                reject(error)
                            } else {
                                console.log("Usuário cadastrado com sucesso!")
                                resolve(true)
                            }
                        }
                    )
                }
            })
        })
    }
    async inserirToken(token: string, email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ocean;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Passo1")

                    this.connection.query(
                        `UPDATE usuario SET token = ? WHERE email = ?`,
                        [token, email],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar token:", error)
                                reject(error)
                            } else {
                                if (results.affectedRows > 0) {
                                    console.log("Token atualizado no banco com sucesso!")
                                    resolve(true)
                                } else {
                                    console.log("Nenhum registro atualizado.")
                                    resolve(false)
                                }
                            }
                        }
                    )
                }
            })
        })
    }


    async pegaToken(email: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ocean;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("passo2")

                    this.connection.query(
                        `SELECT token FROM usuario WHERE email = ?`,
                        [email],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao encontrar token:", error)
                                reject(error)
                            } else {
                                if (results.length > 0) {
                                    const token = results[0].token // Atribui o valor do token
                                    console.log("Token encontrado com sucesso")
                                    resolve(token)
                                } else {
                                    console.log("Nenhum registro encontrado.")
                                    resolve(null) // Retorna null se nenhum token for encontrado
                                }
                            }
                        }
                    )
                }
            })
        })
    }
    async alterarSenha(token: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ocean;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("passo 3"),
                    this.connection.query(
                        `UPDATE usuario SET senha = ? WHERE token = ?`,
                        [password, token],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar token:", error)
                                reject(error)
                            } else {
                                if (results.affectedRows > 0) {
                                    console.log("Senha atualizada no banco com sucesso!")
                                    resolve(true)
                                } else {
                                    console.log("senha deu pau.")
                                    resolve(false)
                                }
                            }
                        }
                    )
                }
            })
        })
    }

    async buscarUsuarioPorUsername(dbName: string, username: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `SELECT * FROM usuario WHERE email = ? OR cpf = ?`,
                        [username, username],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar usuário:", error);
                                reject(error);
                            } else {
                                if (results.length > 0) {
                                    console.log("Usuário encontrado:", results[0]);
                                    resolve(results[0]); // Retorna o primeiro usuário encontrado
                                } else {
                                    console.log("Usuário não encontrado");
                                    resolve(null); // Retorna null se o usuário não for encontrado
                                }
                            }
                        }
                    );
                }
            });
        });
    }
    
    async buscarUsuarioPorId(dbName: string, idUsuario: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `SELECT * FROM usuario WHERE id_usuario = ?`,
                        [idUsuario],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar usuário pelo ID:", error);
                                reject(error);
                            } else {
                                if (results.length > 0) {
                                    console.log("Usuário encontrado:", results[0]);
                                    resolve(results[0]); // Retorna o usuário encontrado
                                } else {
                                    console.log("Usuário não encontrado");
                                    resolve(null); // Retorna null se o usuário não for encontrado
                                }
                            }
                        }
                    );
                }
            });
        });
    }
    async verificaCPF(cpf: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ocean;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `SELECT cpf FROM usuario WHERE cpf = ?`,
                        [cpf],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar CPF:", error);
                                reject(error);
                            } else {
                                if (results.length > 0) {
                                    console.log("CPF já cadastrado:", results[0].cpf);
                                    resolve(true); // CPF já cadastrado
                                } else {
                                    resolve(false); // CPF não cadastrado
                                }
                            }
                        }
                    );
                }
            });
        });
    }

    async verificaEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ocean;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `SELECT email FROM usuario WHERE email = ?`,
                        [email],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar email:", error);
                                reject(error);
                            } else {
                                if (results.length > 0) {
                                    console.log("Email já cadastrado:", results[0].email);
                                    resolve(true); // Email já cadastrado
                                } else {
                                    resolve(false); // Email não cadastrado
                                }
                            }
                        }
                    );
                }
            });
        });
    }   
    

}
