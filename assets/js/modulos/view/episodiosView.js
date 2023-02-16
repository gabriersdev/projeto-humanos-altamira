import { episodiosController } from "../controller/episodiosController.js";
import { comparaNumero, comparaNumeroDescrescente } from "../utilitarios/utilitarios.js";

const episodios = episodiosController();

const carregarEpisodios = (quantidade, lista) => {
  quantidade == undefined ? quantidade = 6 : '';
  lista == undefined ? lista = episodios : '';
  const episodiosCards = document.querySelector('.episodios__cards');
  episodiosCards.innerHTML = '';
  
  lista.sort((a, b) => comparaNumero(a, b));
  
  lista.forEach((episodio, index) => {
    if(index < quantidade){
      episodiosCards.innerHTML += criarCard(episodio).trim();
    }
  })
}

const carregarUltimosEpisodios = (quantidade) => {
  const ultimosEpisodiosCards = document.querySelector('.ultimos-episodios__cards');
  ultimosEpisodiosCards.innerHTML = '';

  const ultimosEpisodios = episodiosController().splice(episodiosController().length - quantidade, episodiosController().length);

  ultimosEpisodios.sort((a, b) => comparaNumeroDescrescente(a, b));

  ultimosEpisodios.splice(0, quantidade).forEach(episodio => {
    ultimosEpisodiosCards.innerHTML += criarCard(episodio).trim();
  })
}

const criarCard = ({nome, descricao, link, img, wiki}) => {
  
  if(descricao.length > 55){
    descricao = descricao.substr(0, 55);
    descricao += "...";
  }

  let titulo = nome.split(' - ');
  titulo = titulo[1];

  let numero = nome.split(' - ');
  numero = numero[0];
  // console.log(numero, img, link);

  return `
  <div class="card" style='background-image:url(${img})'>
  <div class="card__cabecalho">
  <p>Altamira</p>  
  </div>
  
  <div class="card__conteudo">
  <h3 class="card__titulo">${titulo}</h3>
  <p>${descricao}</p>
  </div>
  
  <div class="card__rodape">
  <div class="identificacao-ep">
  <span class="identificacao-ep__nome">Episódio</span>
  <span class="identificacao-ep__numero">${numero}</span>
  </div>
  
  <div class="controles">
  <a href="#recomendacao" data-redirecionar='${link}' data-toggle="tooltip" data-placement="right" title="Ouvir" class="controle__ouvir"><i class="bi bi-headphones"></i></a>
  <a href="${wiki}" data-toggle="tooltip" data-placement="right" title="Documentação do episódio" class="controle__saiba-mais"><i class="bi bi-body-text"></i></a>
  </div>
  </div>
  </div>
  `;
  
}

const maximoEpisodios = () => {
  return episodios.length;
}

function existeNoNome(string){
  return episodios.some(episodio => episodio.getNome().substring(0, string.length).toLowerCase() == string.toLowerCase())
}

function buscarNoNome(string){
  return episodios.filter(episodio => episodio.getNome().substring(0, string.length).toLowerCase() == string.toLowerCase());
}

function buscarNoNomePorPalavra(string){
  return episodios.filter(episodio => (episodio.getNome().split(' ')).find(palavra => palavra.substring(0, string.length).toLowerCase() == string.toLowerCase()));
}

function buscarNaDescricao(string){
  return episodios.filter(episodio => episodio.getDescricao().substring(0, string.length).toLowerCase() == string.toLowerCase());
}

function buscarNaDescricaoPorPalavra(string){
  return episodios.filter(episodio => (episodio.getDescricao().split(' ')).find(palavra => palavra.substring(0, string.length).toLowerCase() == string.toLowerCase()));
}

export{
  carregarEpisodios,
  carregarUltimosEpisodios,
  maximoEpisodios
}

export const consultaEpisodiosView = {
  buscarNoNome, 
  buscarNoNomePorPalavra, 
  buscarNaDescricao, 
  buscarNaDescricaoPorPalavra
};