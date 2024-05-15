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
| User Stories | Estimativa (horas) | Critério de aceitação | Tarefas |
| :----------: | :----------------: | :-------------------: | :-----: |
| Como suporte, quero poder responder aos chamados para atender aos clientes | 6 | [front] Visualização dos chamados “em andamento” <br> [front] Quando clicar no botão de responder ao chamado, será encaminhado para a tela de resposta <br> [front] Após a resposta do chamado, o chamado irá para a visualização dos chamados “concluído” <br> [back] Mudança do status do chamado no banco de “em andamento” para “concluído” <br> [back] Resposta armazenada no banco | [front] Criação do botão para responder ao chamado <br> [front] Tela de resposta contendo o template pronto para casos recorrentes e possibilidade de resposta manual <br> [back] Função para alterar o status do chamado para “concluído” <br> [back] Função para armazenar a resposta do chamado no banco |
| Como suporte, quero poder aceitar chamados pendentes para resolver o problema do cliente | 4 | [front] Visualização dos chamados “pendentes” <br> [front] Quando clicar no botão de aceitar ao chamado, o chamado irá para a visualização dos chamados “em andamento” <br> [back] Mudança do status do chamado no banco de “pendente” para “em andamento” | [front] Criação do botão para aceitar ao chamado <br> [back] Função para alterar o status do chamado para “em andamento” |
| Como cliente e suporte, quero poder visualizar meus chamados pendentes, em andamento e concluídos para poder acompanhar o andamento da solicitação | 8 | [front] Visualização dos chamados filtrados por seus respectivos status | [front] Criação do botão para visualização completa do chamado <br> [front] Tela para visualização completa do chamado <br> [front] Visualização resumida do chamado na tela de atendimento/chamados <br> [front] Visualização dos chamados separados por status (pendente, em andamento e concluído) <br> [back] Função para visualizar os dados do chamado na tela de visualização completa <br> [back] Função para visualizar os dados do chamado na visualização resumida na tela de atendimento/chamados <br> [back] Função para filtrar os chamados por status (pendente, em andamento e concluído) |
| Como ADM quero poder cadastrar usuários suporte e ADM para auxiliar no funcionamento do sistema | 6 | [front] Após o cadastro de usuário, exibição do pop-up informando sucesso ou erro <br> [back] Criação do usuário no banco de dados | [front] Página para cadastro de usuários contendo um formulário com dados do usuário (nome, tipo de usuário, horário de trabalho, e-mail, senha, cpf, cep, endereço e número) <br> [back] Função para criação dos usuários cadastrados no banco de dados <br> [back] Função para identificar se o usuário é suporte ou ADM |
| Como suporte e ADM quero poder cadastrar dispositivos no sistema para melhor visualização dos status dos equipamentos | 6 | [front] Após o cadastro de equipamento, exibição do pop-up informando sucesso ou erro <br> [back] Criação do equipamento no banco de dados | [front] Página para cadastro de dispositivos contendo um formulário com dados do equipamento (tipo de dispositivo, status do dispositivo, endereço de IP, localização, data da instalação, notas) <br> [front] Página para visualização dos equipamentos cadastrados <br> [back] Função para criação do equipamento no banco de dados <br> [back] Função para exibição dos equipamentos |
| Como ADM, quero ter um gráfico de chamados concluídos separados por categoria para melhor visualização dos problemas mais recorrentes | 8 | [front] Visualização dos chamados por gráfico de barras, filtrados por status do chamado no banco de dados | [front] Criação do gráfico de barras <br> [back] Filtragem do gráfico por status do chamado no banco de dados |
| Como suporte, quero poder deletar chamados inválidos para não comprometer o andamento dos outros chamados | 4 | [front] Visualização dos chamados “pendentes” <br> [front] Quando clicar no botão de deletar o chamado, o chamado será excluído, o tirando de todas as visualizações <br> [back] O chamado será deletado do banco | [front] Criação do botão para deletar o chamado  <br> [back] Função para deletar o chamado |
