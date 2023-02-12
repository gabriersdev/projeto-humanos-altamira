import { personagensController } from "../controller/personagensController.js";

const personagens = personagensController();

const carregarPersonagens = (quantidade) => {
  quantidade == undefined ? quantidade = 340 : '';
  const personagensCards = document.querySelector('.personagens__cards');
  personagensCards.innerHTML = '';
  const cards = new Array();
  
  personagens.forEach((personagem, index) => {
    if(index < quantidade){
      cards.push(criarCard(personagem.nome, personagem.descricao, personagem.link).trim());
    }
  });

  cards.forEach(card => {
    personagensCards.innerHTML += card;
  })
}

const criarCard = (nome, descricao, link) => {

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
  maximoPersonagens
}