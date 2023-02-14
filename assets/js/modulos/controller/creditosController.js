import { creditosConteudo } from "../conteudo/creditosConteudo.js";
import { CreditosModel } from "../model/creditosModel.js"

const creditosController = () => {
  const creditos = new Array();
  
  creditosConteudo.forEach(credito => {
    const creditoModel = new CreditosModel(credito.nome.trim(), credito.descricao.trim(), credito.contato.trim());
    creditos.push(creditoModel);
  })

  return creditos;
}

function existeNoNome(string){
  return creditosConteudo.some(credito => credito.nome.substring(0, string.length).toLowerCase() == string.toLowerCase())
}

function buscarNoNome(string){
  return creditosConteudo.filter(credito => credito.nome.substring(0, string.length).toLowerCase() == string.toLowerCase());
}

function buscarNoNomePorPalavra(string){
  return creditosConteudo.filter(credito => (credito.nome.split(' ')).find(palavra => palavra.substring(0, string.length).toLowerCase() == string.toLowerCase()));
}

function buscarNaDescricao(string){
  return creditosConteudo.filter(credito => credito.descricao.substring(0, string.length).toLowerCase() == string.toLowerCase());
}

function buscarNaDescricaoPorPalavra(string){
  return creditosConteudo.filter(credito => (credito.descricao.split(' ')).find(palavra => palavra.substring(0, string.length).toLowerCase() == string.toLowerCase()));
}

export{
  creditosController
}