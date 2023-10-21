import { creditosController, buscarNoNome, buscarNoNomePorPalavra, buscarNaDescricao, buscarNaDescricaoPorPalavra } from "../controller/creditosController.js";
import { comparaNomes, isEmpty } from "../utilitarios/utilitarios.js";

const creditos = creditosController();

const carregarCreditos = (quantidade, lista) => {
  try{
    quantidade == undefined ? quantidade = 6 : '';
    lista == undefined ? lista = creditos : '';
    const creditosCards = document.querySelector('.creditos__cards');
    creditosCards.innerHTML = '';
    
    lista.sort((a, b) => comparaNomes(a, b));
    
    lista.forEach((credito, index) => {
      if(index < quantidade){
        creditosCards.innerHTML += criarCard(credito);
      }
    })
  }catch(error){
    
  }
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
    labelIcon = `Site ${pegarNomeDominio(contato)}`;
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

const pegarNomeDominio = (url) => {
  const urlOutro = new URL(url).host.toString().split('.');
  let pontoCom = '';
  
  if(urlOutro.indexOf('com') >= 0){
    pontoCom = urlOutro.indexOf('com');
  }else if(urlOutro.indexOf('com/') >= 0){
    pontoCom = urlOutro.indexOf('com/');
  }else{
    pontoCom = null;
  }
  
  if(pontoCom !== null){
    const nomeDominio = urlOutro[pontoCom - 1];
    return nomeDominio.charAt(0).toUpperCase() + nomeDominio.substring(1, nomeDominio.length).toLowerCase();
  } else {
    return null;
  }
}

const maximoCreditos = () => {
  return creditos.length;
}

export{
  carregarCreditos,
  maximoCreditos
}

export const consultaCreditosView = {
  buscarNoNome, 
  buscarNoNomePorPalavra, 
  buscarNaDescricao, 
  buscarNaDescricaoPorPalavra
}