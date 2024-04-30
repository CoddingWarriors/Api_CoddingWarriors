import { Connection, createConnection } from "mysql"

export class Conecta {
    public connection: Connection

    constructor() {
        this.connection = createConnection({
            host: "localhost",
            user: "root",
            password: "fatec",
        })
    }

    connectToOcean(callback: () => void): void {
        this.connection.connect((err) => {
            if (err) {
                console.error("Erro ao conectar ao MySQL:", err)
                throw err
            }
            console.log("Conexão bem sucedida ao MySQL. Criando o banco de dados Ocean...")
            this.createOceanDatabase(callback)
        })
    }

    private createOceanDatabase(callback: () => void): void {
        this.connection.query("CREATE DATABASE IF NOT EXISTS Ocean", (err) => {
            if (err) {
                console.error("Erro ao criar o banco de dados Ocean:", err)
                throw err
            }
            console.log("Banco de dados Ocean criado com sucesso")
            // Atualiza a conexão para usar o banco de dados 'Ocean'
            this.connection = createConnection({
                host: "localhost",
                user: "root",
                password: "fatec",
                database: "Ocean",
            })
            // Chama o callback passando a conexão atualizada
            callback()
        })
    }
}
