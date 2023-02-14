import { personagensConteudo } from "../conteudo/personagensConteudo.js";
import { PersonagemModel } from "../model/personagensModel.js";

const personagensController = () => {
  const personagens = new Array();
  
  personagensConteudo.forEach(personagem => {
    const personagemModel = new PersonagemModel(personagem.nome.trim(), personagem.descricao.trim(), personagem.link.trim());
    personagens.push(personagemModel);
  })
  
  return personagens;
}

function existeNoNome(string){
  return personagensConteudo.some(personagem => personagem.nome.substring(0, string.length).toLowerCase() == string.toLowerCase())
}

function buscarNoNome(string){
  return personagensConteudo.filter(personagem => personagem.nome.substring(0, string.length).toLowerCase() == string.toLowerCase());
}

function buscarNoNomePorPalavra(string){
  return personagensConteudo.filter(personagem => (personagem.nome.split(' ')).find(palavra => palavra.substring(0, string.length).toLowerCase() == string.toLowerCase()));
}

function buscarNaDescricao(string){
  return personagensConteudo.filter(personagem => personagem.descricao.substring(0, string.length).toLowerCase() == string.toLowerCase());
}

function buscarNaDescricaoPorPalavra(string){
  return personagensConteudo.filter(personagem => (personagem.descricao.split(' ')).find(palavra => palavra.substring(0, string.length).toLowerCase() == string.toLowerCase()));
}

export {
  personagensController
};