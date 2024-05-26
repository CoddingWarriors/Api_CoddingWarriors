<img src="documents/img/sprint4/apresentacaoSprint4.png">

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
Essa sprint terá como objetivo a criação de tempo estimado até a conclusão do chamado, será definido o horário de trabalho de cada usuário suporte e adm, o FAQ será dinâmico, sendo possível adicionar perguntas e alterar as existentes e os usuários vão poder alterar suas informações pessoais  

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
- Manual do usuário (online)
- Guia de instalação

<br>

<span id="backlog">

## 📖 Sprint Backlog
| User Stories | Estimativa (horas) | Critério de aceitação | Tarefas |
| :----------: | :----------------: | :-------------------: | :-----: |
| Como cliente, quero visualizar o tempo estimado de solução do chamado para ter conhecimento de quando será finalizado | 6 | [front] Quando o cliente criar um chamado com a categoria "sem conexão de internet", deverá mostrar um contador de 1 hora. <br> [front] Quando o cliente criar um chamado com a categoria "velocidade de internet baixa", deverá mostrar um contador de 2 hora. <br> [front] Quando o cliente criar um chamado com a categoria "internet instável", deverá mostrar um contador de 3 hora. | [front] Visualização do contador nos chamados que estão em aberto e em andamento <br> [back] Função para criar o contador com base na sua categoria |
| Como ADM quero poder definir o horário de serviço de cada suporte para uma melhor administração de serviço | 8 | [front] Quando estiver fora do seu horário de serviço, os usuários suporte e ADM serão impedidos de entrar, exibindo uma mensagem de erro. Caso estiver dentro do seu horário de serviço, poderá acessar o sistema normalmente. | [back] Criação de uma função para permitir que os usuários suporte e adm só possam acessar sua conta no horário de trabalho <br> [BD] Atualizar o campo de horário da tabela usuário para o tipo hora |
| Como suporte e ADM quero editar e cadastrar dúvidas recorrentes no FAQ para mantê-lo atualizado | 7 | [front] Usuários suporte e ADM conseguem adicionar novas perguntas ao FAQ <br> [front] Usuários suporte e ADM conseguem alterar as perguntas do FAQ <br> [back] Após alterações ou inserções de perguntas, deverá ser atualizado o banco de dados | [front] Criação de interface para visualização das perguntas presentes no FAQ <br> [front] Criação dos botões de editar e cadastrar dúvidas <br> [back] Função para buscar as informações do FAQ no banco <br> [back] Função para editar as perguntas do FAQ no banco <br> [back] Função para criar as perguntas do FAQ no banco
| Como suporte, cliente e ADM quero poder alterar minhas informações pessoais para manter o sistema atualizado | 8 | [front] O usuário visualiza suas informações pessoais mais recentes. Ao fazer uma alteração, as informações pessoais são atualizadas e passam a mostrar as novas informações. <br> [back] Após alterações de informações, deverá ser atualizado o banco de dados | [front] Criação de interface para visualização das informações pessoais atuais <br> [back] Criação da função para atualizar os dados pessoais no banco <br> [back] Criação da função para buscar os dados pessoais no banco |
