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
                        `CREATE TABLE IF NOT EXISTS usuario (
                            id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                            cpf VARCHAR(11) NOT NULL,
                            nome VARCHAR(50),
                            telefone VARCHAR(25),
                            email VARCHAR(30),
                            senha VARCHAR(10),
                            endereco VARCHAR(50),
                            numero INT,
                            cep VARCHAR(8),
                            token VARCHAR(250),
                            tipo VARCHAR(1),
                            horario_inicio TIME,
                            horario_fim TIME,
                            UNIQUE KEY (cpf)
                        );`,
                        (createErro, createResults) => {
                            if (createErro) {
                                console.error("Erro ao criar a tabela usuario:", createErro)
                                reject(createErro)
                            } else {
                                console.log("Tabela usuario criada com sucesso!")
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
        horario_inicio: string,
        horario_fim: string,
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`Use ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `INSERT INTO usuario (
                            cpf, nome, telefone, email, senha, endereco, numero, cep, tipo, horario_inicio, horario_fim
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                        [cpf, nome, telefone, email, senha, endereco, numero, cep, tipo, horario_inicio, horario_fim],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao cadastrar usuário:", error);
                                reject(error);
                            } else {
                                console.log("Usuário cadastrado com sucesso!");
                                resolve(true);
                            }
                        }
                    );
                }
            });
        });
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
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `SELECT * FROM usuario WHERE email = ? OR cpf = ?`,
                        [username, username],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar usuário:", error)
                                reject(error)
                            } else {
                                if (results.length > 0) {
                                    console.log("Usuário encontrado:", results[0])
                                    resolve(results[0]) // Retorna o primeiro usuário encontrado
                                } else {
                                    console.log("Usuário não encontrado")
                                    resolve(null) // Retorna null se o usuário não for encontrado
                                }
                            }
                        }
                    )
                }
            })
        })
    }

    async buscarUsuarioPorId(dbName: string, idUsuario: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `SELECT * FROM usuario WHERE id_usuario = ?`,
                        [idUsuario],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar usuário pelo ID:", error)
                                reject(error)
                            } else {
                                if (results.length > 0) {
                                    console.log("Usuário encontrado:", results[0])
                                    resolve(results[0]) // Retorna o usuário encontrado
                                } else {
                                    console.log("Usuário não encontrado")
                                    resolve(null) // Retorna null se o usuário não for encontrado
                                }
                            }
                        }
                    )
                }
            })
        })
    }
    async verificaCPF(cpf: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ocean;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `SELECT cpf FROM usuario WHERE cpf = ?`,
                        [cpf],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar CPF:", error)
                                reject(error)
                            } else {
                                if (results.length > 0) {
                                    console.log("CPF já cadastrado:", results[0].cpf)
                                    resolve(true) // CPF já cadastrado
                                } else {
                                    resolve(false) // CPF não cadastrado
                                }
                            }
                        }
                    )
                }
            })
        })
    }

    async verificaEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ocean;`, (useError, useResults) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `SELECT email FROM usuario WHERE email = ?`,
                        [email],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar email:", error)
                                reject(error)
                            } else {
                                if (results.length > 0) {
                                    console.log("Email já cadastrado:", results[0].email)
                                    resolve(true) // Email já cadastrado
                                } else {
                                    resolve(false) // Email não cadastrado
                                }
                            }
                        }
                    )
                }
            })
        })
    }

    async buscarUsuarioPorCpf(dbName: string, cpf: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`SELECT * FROM usuario WHERE cpf = ?`, [cpf], (error, results) => {
                        if (error) {
                            console.error("Erro ao buscar usuário por CPF:", error)
                            reject(error)
                        } else {
                            resolve(results[0])
                        }
                    })
                }
            })
        })
    }

    async atualizarUsuario(dbName: string, cpf: string, nome: string, email: string, senha: string, telefone: string, cep: string, endereco: string, numero: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`UPDATE usuario SET nome = ?, email = ?, senha = ?, telefone = ?, cep = ?, endereco = ?, numero = ? WHERE cpf = ?`, [nome, email, senha, telefone, cep, endereco, numero, cpf], (error, results) => {
                        if (error) {
                            console.error("Erro ao atualizar usuário", error)
                            reject(error)
                        } else {
                            resolve(results[0])
                        }
                    })
                }
            })
        })
    }

    async atualizaFotoUsuario (dbName: string, foto: Buffer | null, cpf: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(`UPDATE usuario SET foto = ?  WHERE cpf = ?;`, [foto, cpf], (error, results) => {
                        if (error) {
                            console.error("Erro ao atualizar foto", error)
                            reject(error)
                        } else {
                            resolve(results[0])
                        }
                    })
                }
            })
        })
    }
}
