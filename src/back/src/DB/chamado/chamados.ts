export default class Chamados{
    public id!: number;
    public descrição!: string;
    public data_inicio!: Date;
    public data_fim!: Date;
    public resposta!: string;
    public status!: string;

    constructor(id: number, descricao: string, data_inicio: Date, data_fim: Date, resposta: string, status: string) {
        this.id = id
        this.descrição = descricao
        this.data_inicio = new Date(data_inicio)
        this.data_fim = new Date(data_fim)
        this.resposta = resposta
        this.status = status
    }
}
