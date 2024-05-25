import { Connection } from "mysql"
import { Conecta } from "../../conexao"

export class Chamado {
    private connection: Connection

    constructor(conexao: Conecta) {
        this.connection = conexao.connection
    }

    async createTableChamado(dbName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `
                        CREATE TABLE IF NOT EXISTS chamado (
                            id_chamado INT AUTO_INCREMENT PRIMARY KEY,
                            titulo VARCHAR(30),
                            descricao VARCHAR(100),
                            categoria ENUM(
                                'Velocidade de internet baixa',
                                'Internet instável',
                                'Sem conexão de internet'
                            ),
                            respostas VARCHAR(100),
                            status VARCHAR(30),
                            id_usuario INT,
                            id_suporte INT,
                            imagem LONGBLOB, /* Nova coluna para armazenar a imagem */
                            FOREIGN KEY (id_suporte) REFERENCES usuario(id_usuario),
                            FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
                        );
                        `,
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao criar tabela Chamado:", error);
                                reject(error);
                            } else {
                                console.log("Tabela Chamado criada com sucesso!");
                                resolve();
                            }
                        }
                    );
                }
            });
        });
    }
    

    async novoChamado(
        dbName: string,
        titulo: string,
        descricao: string,
        categoria: string,
        userId: number,
        imagemBinaria: Buffer | null
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
                        INSERT INTO chamado (titulo, descricao, categoria, respostas, status, id_usuario, id_suporte, imagem)
                        VALUES (?, ?, ?, NULL, 'Aberto', ?, NULL, ?)
                        `,
                        [titulo, descricao, categoria, userId, imagemBinaria],
                        (error, results) => {
                            if (error) {
                                console.error("Erro", error)
                                reject(error)
                            } else {
                                console.log("Sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async buscarChamadosDoUsuario(dbName: string, userId: number, status: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                            SELECT *
                            FROM chamado
                            WHERE id_usuario = ? AND status = ?
                            `,
                        [userId, status],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar chamados:", error)
                                reject(error)
                            } else {
                                console.log("Chamados encontrados com sucesso!")
                                resolve(results)
                            }
                        }
                    )
                }
            })
        })
    }

    async buscarChamadoPorStatus(dbName: string, status: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                            SELECT *
                            FROM chamado
                            WHERE status = ?
                            `,
                        [status],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao buscar chamados pelo status:", error)
                                reject(error)
                            } else {
                                console.log("Chamados encontrados com sucesso!")
                                resolve(results)
                            }
                        }
                    )
                }
            })
        })
    }

    async excluirChamado(dbName: string, chamadoId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                    DELETE FROM chamado
                    WHERE id_chamado = ?
                    `,
                        [chamadoId],
                        (error) => {
                            if (error) {
                                console.error("Erro ao excluir o chamado:", error)
                                reject(error)
                            } else {
                                console.log("Chamado excluído com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async atualizarStatusChamadoAndamento(dbName: string, chamadoId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                            UPDATE chamado
                            SET status = 'Em andamento'
                            WHERE id_chamado = ?
                            `,
                        [chamadoId],
                        (error) => {
                            if (error) {
                                console.error("Erro ao atualizar o status do chamado:", error)
                                reject(error)
                            } else {
                                console.log("Status do chamado atualizado para 'Em andamento' com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async obterInformacoesChamado(
        dbName: string,
        chamadoId: number
    ): Promise<{ titulo: string; descricao: string; categoria: string; imagem: string | null; status: string; respostas: string }> { 
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                            SELECT titulo, descricao, categoria, imagem, status, respostas
                            FROM chamado
                            WHERE id_chamado = ?
                        `,
                        [chamadoId],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao obter informações do chamado:", error)
                                reject(error)
                            } else {
                                if (results.length === 0) {
                                    reject(new Error("Chamado não encontrado"))
                                } else {
                                    const { titulo, descricao, categoria, imagem, status, respostas } = results[0]
                                    const imagemUrl = imagem ? `data:image/jpeg;base64,${imagem.toString('base64')}` : null;
                                    resolve({ titulo, descricao, categoria, imagem: imagemUrl, status, respostas })
                                }
                            }
                        }
                    )
                }
            })
        })
    }
    
    

    async ResponderChamado(
        dbName: string,
        chamadoId: number,
        resposta: string,
        userId: number
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
                            UPDATE chamado
                            SET respostas = ?,
                                status = 'Concluído',
                                id_suporte = ?
                            WHERE id_chamado = ?
                            `,
                        [resposta, userId, chamadoId],
                        (error, results) => {
                            if (error) {
                                console.error("Erro", error)
                                reject(error)
                            } else {
                                console.log("Chamado respondido com sucesso!")
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    async visualizarChamadoADM(dbName: string): Promise<{ categoria: string; totalCategoria: number }[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                            SELECT categoria, COUNT(*) as totalCategoria
                            FROM chamado
                            GROUP BY categoria;
                            `,
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao obter informações do chamado:", error)
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
}
