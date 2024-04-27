import { Connection } from 'mysql';
import { Conecta } from './conexao';
import { Usuario } from './ususario/usuario';
import { Faq } from './faq/faq';
import { Chamado } from './chamado/chamado';
import { Equipamento } from './equipamento/equipamento';

const dbName = 'Ocean';
const conexao = new Conecta();
// instancia as classes
const usuario = new Usuario(conexao);
const faq = new Faq(conexao);
const chamado = new Chamado(conexao);
const equipamento = new Equipamento(conexao);

// roda os metodos de criação
conexao.connectToOcean(() => {
  usuario.createTableUsuario(dbName)
    .then(() => {
      return faq.createTableFaq(dbName); // Retorna uma Promise para encadear a próxima operação
    })
    .then(()=>{
      return equipamento.createTableEquipamento(dbName);
      })
    .then(() => {
      return chamado.createTableChamado(dbName);
    })
    .then(() => {
      console.log('Tabelas criadas com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao criar tabelas:', error);
    });
});
