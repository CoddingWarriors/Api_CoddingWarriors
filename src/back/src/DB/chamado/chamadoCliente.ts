export default class chamadoCliente{
    public titulo!: string;
    public descrição!: string;
    public categoria!: string
    public data_inicio!: Date;
    public status!: string

    constructor(titulo:string, descricao: string, categoria: string, data_inicio: Date, status: string) {
        this.titulo = titulo
        this.descrição = descricao
        this.categoria = categoria
        this.data_inicio = new Date(data_inicio)
        this.status = status
    }
}
