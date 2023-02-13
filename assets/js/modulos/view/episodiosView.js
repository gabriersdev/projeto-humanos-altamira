import { episodiosController } from "../controller/episodiosController.js";
import { comparaNumero, isEmpty } from "../utilitarios/utilitarios.js";

const episodios = episodiosController();

const carregarEpisodios = (quantidade) => {
  quantidade == undefined ? quantidade = 6 : '';
  const episodiosCards = document.querySelector('.episodios__cards');
  episodiosCards.innerHTML = '';
  
  episodios.sort((a, b) => comparaNumero(a, b));
  
  episodios.forEach((episodio, index) => {
    if(index < quantidade){
      episodiosCards.innerHTML += criarCard(episodio).trim();
    }
  })
}

const criarCard = ({nome, descricao, link, img}) => {
  
  if(descricao.length > 55){
    descricao = descricao.substr(0, 55);
    descricao += "...";
  }

  let numero = nome.split(' - ');
  numero = numero[0];
  return `
  <div class="card" data-redirecionar='${link}' style='background-image:url(${img})'>
  <div class="card__cabecalho">
  <p>Altamira</p>  
  </div>
  
  <div class="card__conteudo">
  <h3 class="card__titulo">${nome}</h3>
  <p>${descricao}</p>
  </div>
  
  <div class="card__rodape">
  <div class="identificacao-ep">
  <span class="identificacao-ep__nome">Episódio</span>
  <span class="identificacao-ep__numero">${numero}</span>
  </div>
  
  <div class="controles">
  <a href="#recomendacao" data-toggle="tooltip" data-placement="right" title="Ouvir" class="controle__ouvir"><i class="bi bi-headphones"></i></a>
  <a href="${link} data-toggle="tooltip" data-placement="right" title="Documentação do episódio" class="controle__saiba-mais"><i class="bi bi-body-text"></i></a>
  </div>
  </div>
  </div>
  `;
  
}

const maximoEpisodios = () => {
  return episodios.length;
}

export{
  carregarEpisodios,
  maximoEpisodios
}