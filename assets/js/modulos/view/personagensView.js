import { buscarNaDescricao, buscarNaDescricaoPorPalavra, buscarNoNome, buscarNoNomePorPalavra, personagensController } from "../controller/personagensController.js";
import { comparaNomes } from "../utilitarios/utilitarios.js";

const personagens = personagensController();

const carregarPersonagens = (quantidade, lista) => {
  quantidade == undefined ? quantidade = 6 : '';
  lista == undefined ? lista = personagens : '';
  const personagensCards = document.querySelector('.personagens__cards');
  personagensCards.innerHTML = '';
  
  lista.sort((a, b) => comparaNomes(a, b));

  lista.forEach((personagem, index) => {
    if(index < quantidade){
      personagensCards.innerHTML += criarCard(personagem).trim();
    }
  });
}

const criarCard = ({nome, descricao, link}) => {

  if(descricao.length > 90){
    descricao = descricao.substr(0, 90);
    descricao += "...";
  }

  return `          
  <a href="${link}" class="card">
  <div class="card__cabecalho">
  <span class="card__marcador">
  <i class=""></i>
  </span>
  <h3 class="card__titulo">${nome}</h3>
  </div>
  <div class="card__conteudo">
  <p>${descricao}</p>
  </div>
  </a>
  `
}

const maximoPersonagens = () => {
  return personagens.length;
}

export{
  carregarPersonagens,
  maximoPersonagens,
}

export const consultaPersonagensView = {buscarNoNome, buscarNoNomePorPalavra, buscarNaDescricao, buscarNaDescricaoPorPalavra};