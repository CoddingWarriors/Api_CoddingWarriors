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
                            categoria VARCHAR(100),
                            respostas VARCHAR(100),
                            status VARCHAR(30),
                            id_usuario INT,
                            id_suporte INT,
                            imagem LONGBLOB,
                            tempo INT,
                            dataCriacao DATETIME,
                            dataFinalizacao DATETIME,
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
        tempo: number | null,
        userId: number,
        imagemBinaria: Buffer | null,
        dataCriacao: string,
        dataFinalizacao: string | null
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
    
                    // Formatar dataCriacao para o formato correto
                    const formattedDataCriacao = dataCriacao.replace('T', ' ').replace('Z', '');
    
                    // Formatar dataFinalizacao para o formato correto se não for null
                    let formattedDataFinalizacao = null;
                    if (dataFinalizacao) {
                        formattedDataFinalizacao = dataFinalizacao.replace('T', ' ').replace('Z', '');
                    }
    
                    this.connection.query(
                        `
                        INSERT INTO chamado (
                            titulo, descricao, categoria, tempo, respostas, status, id_usuario, id_suporte, imagem, dataCriacao, dataFinalizacao
                        )
                        VALUES (?, ?, ?, ?, NULL, 'Aberto', ?, NULL, ?, ?, ?)
                        `,
                        [titulo, descricao, categoria, tempo, userId, imagemBinaria, formattedDataCriacao, formattedDataFinalizacao],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao inserir chamado:", error);
                                reject(error);
                            } else {
                                console.log("Sucesso!");
                                resolve();
                            }
                        }
                    );
                }
            });
        });
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
    ): Promise<{ 
        titulo: string; 
        descricao: string; 
        categoria: string; 
        imagem: string | null; 
        status: string; 
        respostas: string;
        dataCriacao: Date; 
        dataFinalizacao: Date | null; 
    }> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `
                        SELECT 
                            titulo, 
                            descricao, 
                            categoria, 
                            imagem, 
                            status, 
                            respostas, 
                            dataCriacao, 
                            dataFinalizacao
                        FROM chamado
                        WHERE id_chamado = ?
                        `,
                        [chamadoId],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao obter informações do chamado:", error);
                                reject(error);
                            } else {
                                if (results.length === 0) {
                                    reject(new Error("Chamado não encontrado"));
                                } else {
                                    const { 
                                        titulo, 
                                        descricao, 
                                        categoria, 
                                        imagem, 
                                        status, 
                                        respostas, 
                                        dataCriacao, 
                                        dataFinalizacao 
                                    } = results[0];
                                    
                                    // Converter imagem para URL base64 se existir
                                    const imagemUrl = imagem ? `data:image/jpeg;base64,${imagem.toString('base64')}` : null;
    
                                    // Converter dataCriacao e dataFinalizacao para objetos Date
                                    const dataCriacaoObj = new Date(dataCriacao);
                                    const dataFinalizacaoObj = dataFinalizacao ? new Date(dataFinalizacao) : null;
    
                                    resolve({ 
                                        titulo, 
                                        descricao, 
                                        categoria, 
                                        imagem: imagemUrl, 
                                        status, 
                                        respostas, 
                                        dataCriacao: dataCriacaoObj, 
                                        dataFinalizacao: dataFinalizacaoObj 
                                    });
                                }
                            }
                        }
                    );
                }
            });
        });
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

    async visualizarChamadosPorStatus(dbName: string): Promise<{ abertos: number; emAndamento: number; concluidos: number; total: number }> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    this.connection.query(
                        `
                        SELECT 
                            SUM(CASE WHEN status = 'Aberto' THEN 1 ELSE 0 END) AS abertos,
                            SUM(CASE WHEN status = 'Em andamento' THEN 1 ELSE 0 END) AS emAndamento,
                            SUM(CASE WHEN status = 'Concluido' THEN 1 ELSE 0 END) AS concluidos,
                            COUNT(*) AS total
                        FROM chamado;
                        `,
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao obter informações do chamado:", error);
                                reject(error);
                            } else {
                                resolve(results[0]);
                            }
                        }
                    );
                }
            });
        });
    }
    
    async atualizarDataFinalizacao(dbName: string, chamadoId: number, novaDataFinalizacao: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError);
                    reject(useError);
                } else {
                    console.log("Banco de dados selecionado com sucesso!");
                    console.log("Data de finalização recebida:", novaDataFinalizacao); // Adicione este log para verificar a data recebida
    
                    this.connection.query(
                        `
                        UPDATE chamado
                        SET dataFinalizacao = ?
                        WHERE id_chamado = ?
                        `,
                        [novaDataFinalizacao, chamadoId],
                        (error, results) => {
                            if (error) {
                                console.error("Erro ao atualizar data de finalização:", error);
                                reject(error);
                            } else {
                                console.log("Data de finalização atualizada com sucesso!");
                                resolve();
                            }
                        }
                    );
                }
            });
        });
    }
        
}
