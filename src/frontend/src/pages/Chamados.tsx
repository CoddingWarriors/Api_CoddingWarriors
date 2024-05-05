import ChamadosSC from "../components/ChamadosSC"
import TicketsP from "../components/TicketsP"
import TicketsA from "../components/TicketsA"
import TicketsC from "../components/TicketsC"
import styleChamado from "../styles/Chamados.module.css"

function ChamadosS() {
    return (
        <div className={styleChamado.cobreTela}>
            <ChamadosSC
                className={styleChamado.tituloLaranja}
                titulo="Chamados Pendentes"
                conteudo={
                    <>
                    <TicketsP
                        ID="123456789"
                        Assunto="Assunto teste para o Ticket em andamento"
                        Descricao="Descrição teste do Ticket em andamento"
                        link="/chamados/123456789"
                    />
                    <TicketsP
                        ID="123456789"
                        Assunto="Assunto teste para o Ticket em andamento"
                        Descricao="Descrição teste do Ticket em andamento"
                        link="/chamados/123456789"
                    />
                </>
                }
            />

            <ChamadosSC
                className={styleChamado.tituloAzul}
                titulo="Chamados em andamento"
                conteudo={
                    <>
                    <TicketsA
                        ID="123456789"
                        Assunto="Assunto teste para o Ticket em andamento"
                        Descricao="Descrição teste do Ticket em andamento"
                        link="/chamados/123456789"
                    />
                </>
                }
            />

            <ChamadosSC
                className={styleChamado.tituloVerde}
                titulo="Chamados concluídos"
                conteudo={
                    <>
                    <TicketsC
                        ID="123456789"
                        Assunto="Assunto teste para o Ticket em andamento"
                        Descricao="Descrição teste do Ticket em andamento"
                        link="/chamados/123456789"
                    />
                </>
                }
            />
        </div>
    )
}

export default ChamadosS
