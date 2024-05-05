import { Connection } from "mysql"
import { Conecta } from "../../conexao"
import Chamados from "./chamadoCliente"

export default class novoChamado {
    private connection: Connection

    constructor(conexao: Conecta) {
        this.connection = conexao.connection
    }

    async novoChamado(dbName: string, chamado: Chamados): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`USE ${dbName};`, (useError, _) => {
                if (useError) {
                    console.error("Erro ao selecionar o banco de dados:", useError)
                    reject(useError)
                } else {
                    console.log("Banco de dados selecionado com sucesso!")
                    this.connection.query(
                        `
                        INSERT INTO chamado(titulo, desc, cat, dti, status)
                        VALUES(?, ?, ?, ?, ?, ?, ?)
                        `,
                        [
                            chamado.titulo,
                            chamado.descrição,
                            chamado.categoria,
                            chamado.data_inicio,
                            chamado.status,
                        ],
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
}
