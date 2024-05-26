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
- Manual do usuário (online)
- Guia de instalação

<br>

<span id="backlog">

## 📖 Sprint Backlog
| User Stories | Estimativa (horas) | Critério de aceitação | Tarefas |
| :----------: | :----------------: | :-------------------: | :-----: |
| Como suporte, quero poder responder aos chamados para atender aos clientes | 6 | [front] Visualização dos chamados “em andamento” <br> [front] Quando clicar no botão de responder ao chamado, será encaminhado para a tela de resposta <br> [front] Após a resposta do chamado, o chamado irá para a visualização dos chamados “concluído” <br> [back] Mudança do status do chamado no banco de “em andamento” para “concluído” <br> [back] Resposta armazenada no banco | [front] Criação do botão para responder ao chamado <br> [front] Tela de resposta onde será possível inserir uma resposta ao chamado <br> [back] Função para alterar o status do chamado para “concluído” <br> [back] Função para armazenar a resposta do chamado no banco |
| Como suporte, quero poder aceitar chamados pendentes para resolver o problema do cliente | 4 | [front] Visualização dos chamados “pendentes” <br> [front] Quando clicar no botão de aceitar ao chamado, o chamado irá para a visualização dos chamados “em andamento” <br> [back] Mudança do status do chamado no banco de “pendente” para “em andamento” | [front] Criação do botão para aceitar ao chamado <br> [back] Função para alterar o status do chamado para “em andamento” |
| Como cliente e suporte, quero poder visualizar meus chamados pendentes, em andamento e concluídos para poder acompanhar o andamento da solicitação | 8 | [front] Visualização dos chamados filtrados por seus respectivos status | [front] Criação do botão para visualização completa do chamado <br> [front] Tela para visualização completa do chamado <br> [front] Visualização resumida do chamado na tela de atendimento/chamados <br> [front] Visualização dos chamados separados por status (pendente, em andamento e concluído) <br> [back] Função para visualizar os dados do chamado na tela de visualização completa <br> [back] Função para visualizar os dados do chamado na visualização resumida na tela de atendimento/chamados <br> [back] Função para filtrar os chamados por status (pendente, em andamento e concluído) |
| Como ADM quero poder cadastrar usuários suporte e ADM para auxiliar no funcionamento do sistema | 6 | [front] Após o cadastro de usuário, exibição do pop-up informando sucesso ou erro <br> [back] Criação do usuário no banco de dados | [front] Página para cadastro de usuários contendo um formulário com dados do usuário (nome, tipo de usuário, horário de trabalho, e-mail, senha, cpf, cep, endereço e número) <br> [back] Função para criação dos usuários cadastrados no banco de dados <br> [back] Função para identificar se o usuário é suporte ou ADM |
| Como suporte e ADM quero poder cadastrar dispositivos no sistema para melhor visualização dos status dos equipamentos | 6 | [front] Após o cadastro de equipamento, exibição do pop-up informando sucesso ou erro <br> [back] Criação do equipamento no banco de dados | [front] Página para cadastro de dispositivos contendo um formulário com dados do equipamento (tipo de dispositivo, status do dispositivo, endereço de IP, localização, data da instalação, notas) <br> [front] Página para visualização dos equipamentos cadastrados <br> [back] Função para criação do equipamento no banco de dados <br> [back] Função para exibição dos equipamentos |
| Como ADM, quero ter um gráfico de chamados concluídos separados por categoria para melhor visualização dos problemas mais recorrentes | 8 | [front] Visualização dos chamados por gráfico de barras, filtrados por status do chamado no banco de dados | [front] Criação do gráfico de barras <br> [back] Filtragem do gráfico por status do chamado no banco de dados |
| Como suporte, quero poder deletar chamados inválidos para não comprometer o andamento dos outros chamados | 4 | [front] Visualização dos chamados “pendentes” <br> [front] Quando clicar no botão de deletar o chamado, o chamado será excluído, o tirando de todas as visualizações <br> [back] O chamado será deletado do banco | [front] Criação do botão para deletar o chamado  <br> [back] Função para deletar o chamado |

## 🗂 Guia de Instalação
1. Na barra de tarefas do seu computador, procure por "prompt de comando" e abra-o. <br>
2. Insira o comando abaixo para clonar o repositório <br>
```
git clone https://github.com/CoddingWarriors/Api_CoddingWarriors.git
```
3. Vá até o diretório back e instale as dependências <br>
```
cd src/back
```
```
npm i
```
4. Configure o seu banco de dados dentro do arquivo "conexao.ts", localizado no caminho Api_CoddingWarriors/src/back/src/conexao.ts <br>
```
constructor() {
        this.connection = createConnection({
            host: "localhost",
            user: "root",
            password: "sua-senha",
        })
    }
```
```
this.connection = createConnection({
                host: "localhost",
                user: "root",
                password: "sua-senha",
                database: "ocean",
            })
```
5. Compile o seu arquivo .ts para .js <br>
```
tsc
```
6. Inicie o backend <br>
```
npm start
```
7. Abra outro prompt de comando, sem fechar o anterior, vá até o diretório frontend e instale suas dependencias <br>
```
cd Api-CoddingWarriors/src/frontend
```
```
npm i
```
9. Inicie o frontend <br>
```
npm start
```
10. Por fim, acesse o site inserindo "localhost:3000" na barra de URL do navegador 
