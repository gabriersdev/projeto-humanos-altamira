import { creditosController } from "../controller/creditosController.js";
import { comparaNomes, isEmpty } from "../utilitarios/utilitarios.js";

const creditos = creditosController();

const carregarCreditos = (quantidade) => {
  quantidade == undefined ? quantidade = 6 : '';
  const creditosCards = document.querySelector('.creditos__cards');
  creditosCards.innerHTML = '';
  
  creditos.sort((a, b) => comparaNomes(a, b));
  
  creditos.forEach((credito, index) => {
    if(index < quantidade){
      creditosCards.innerHTML += criarCard(credito);
    }
  })
}

const criarCard = ({nome, descricao, contato}) => {

  if(descricao.length > 100){
    descricao = descricao.substr(0, 100);
    descricao += "...";
  }

  let classeIcon = null;
  let labelIcon = '';

  if(isEmpty(contato)){
    classeIcon = 'contato-vazio';
  }else if(new URL(contato).host == 'twitter.com'){
    classeIcon = 'contato-twitter';
    labelIcon = 'Twitter';
  }else{
    classeIcon = 'contato-outro'
    labelIcon = 'Site';
  }

  return `
  <div class="card">
  <div class="card__cabecalho">
  <span class="card__marcador"></span>
  <h3 class="card__titulo">${nome}</h3>
  </div>
  <div class="card__conteudo">
  <p>${descricao}</p>
  </div>
  <div class="card__rodape ${classeIcon}">
  <a href="${contato}" class="card__link" data-toggle="tooltip" data-placement="right" data-bs-custom-class="custom-tooltip" title="${labelIcon}"></a>
  </div>
  </div>
  `;
}

const maximoCreditos = () => {
  return creditos.length;
}

export{
  carregarCreditos,
  maximoCreditos
}