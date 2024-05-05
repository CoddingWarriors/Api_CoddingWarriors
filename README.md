<img src="documents/img/sprint3/apresentacaoSprint3.png">

<br>

<p align="center">
  <a href="#objetivo">Objetivo da Sprint </a>  |
  <a href="#dor">DoR</a> |
  <a href="#dod">DoD</a> |
  <a href="#backlog">Sprint Backlog</a>
</p>

</br>

<span id="objetivo">
  
## 🎯 Objetivo da Sprint
Essa sprint terá como objetivo a criação do usuario administrador, com as funcionalidades de cadastrar usuarios suporte, cadastrar equipamentos, redirecionar chamados, implementar o recurso de visualizar um relatorio de chamados finalizados e alterar o status do chamado.

<br>

<span id="dor">

## 📋 DoR
- Tarefas definidas
- Critérios de aceitação
- Estimativa de horas

<br>

<span id="dod">

## 📈 DoD
- Código
- Vídeo utilizando o sistema

<br>

<span id="backlog">

## 📖 Sprint Backlog
| User Storie | Estimativa (horas) | Critério de aceitação | Tarefas |
| :---------: | :----------------: | :-------------------: | :-----: |
| Como cliente, suporte e ADM quero ter um relatório de chamados finalizados para visualizar todos os chamados já feitos | 3 | [front] Exibição da tela de chamados <br> [front] Exibição de um relatório com os chamados finalizados <br> [back] Chamados criados no banco | [front] Tela de visualizar chamados finalizados(cliente, suporte, adm) - criar um form com os chamados finalizados <br> [back] Status do chamado - criar persistência dos dados no banco <br> |
|Como ADM quero poder cadastrar usuários suporte e ADM para auxiliar no funcionamento do sistema | 7 | [front] Efetuar cadastro de usuarios suporte <br> [front] Exibição de um pop-up de cadastro concluido com sucesso <br> [front] Exibição da tela de cadastro <br> [back] Cadastrar usuarios suporte no banco | [front] Tela de cadastro(ADM) - criar tela de cadastro de usuario suporte <br> [back] Cadastro (ADM) - cadastrar usuarios suporte <br> |
|Como ADM quero poder cadastrar equipamentos no sistema para melhor orientação na resolução de chamados | 7 | [front] Efetuar o cadastro de equipamentos <br> [front] Exibição de um pop-up de equipamento cadastrado com sucesso <br> [front] Exibição da tela de cadastro de equipamentos <br> [front] Exibição da tela de equipamentos <br> [back] Cadastrar equipamento no banco | [front] Tela de cadastro de equipamento - formulário <br> [front] Tela de equipamentos - criar tela de equipamentos <br> [back] Cadastrar os equipamentos- criar persistencia dos dados no banco <br> |
| Como cliente, quero conseguir visualizar o andamento da minha solicitação para ter conhecimento do status do meu chamado | 2 | [front] Visualização das solicitações | [front] Tela de chamados (cliente) - criar um campo para visualizar o andamento das solicitações feitas <br> |
| Como cliente, quero visualizar o tempo estimado de solução do chamado para ter conhecimento de quando será finalizado | 5 | [front] Exibição do tempo estimado nos chamados em aberto <br> | [front] Tela de chamados (cliente) - criar campo tempo estimado para cada chamado aberto <br> [back] Tela de chamados - criar persistencia dos dados no banco <br> |
| Como suporte quero definir o tempo até a conclusão do problema para informar ao cliente | 3 | [front] Definir o tempo estimado para concluir o chamado <br> | [front] Tela de chamados (suporte) - criar um form para que seja possivel definir o tempo estimado para conclusão do chamado <br> [back] Chamados (suporte) - criar a persistencia de dados no banco <br> |
| Como suporte quero poder mudar o status do chamado no sistema para os outros usuários conseguirem visualizar o status atual | 2 | [front] Tela de chamados | [front] Tela de chamados (suporte) - criar campo para alterar o status do chamado <br> [back] Chamados (suporte) - atualizar o status no banco <br> |
| Como ADM quero poder redirecionar os chamados para técnicos responsáveis para uma resolução eficiente | 6 | [front] Exibição dos chamados | [front] Tela de chamados (ADM) -Criar um campo para visualizar os chamados aceitos por usuarios suporte <br> [front] Tela de chamados (ADM) - implementar opção de redirecionar chamado [back] Tela de chamados (ADM) - criar função para redirecionar chamados <br> [back] Chamados (ADM) - atualizar os dados no banco |

