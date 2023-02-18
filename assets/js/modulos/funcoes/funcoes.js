import { isEmpty } from "../utilitarios/utilitarios.js";
import { carregarPersonagens, maximoPersonagens } from "../view/personagensView.js";
import { carregarEpisodios, maximoEpisodios } from "../view/episodiosView.js";
import { carregarCreditos, maximoCreditos } from "../view/creditosView.js";
import { escutaClickBotaoTema } from "./tema.js";

const verificarConfirmacaoNavegacao = () => {
  if(isEmpty(localStorage.getItem('confirmacao-navegacao'))){
    $('#modal-confirmacao-navegacao').modal('show');
  }
}

const controleFechamentoModal = () => {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    const btnFecha = modal.querySelector('[data-modal-fecha]');
    btnFecha.addEventListener('click', () => {
      $('#' + modal.id).modal('hide');
    })
  })
}

const escutaClickVerMais = (qtdeCardsInicial) => {
  document.querySelectorAll('[data-ver-mais]').forEach(botao => {
    switch(botao.dataset.verMais){
      case 'personagens':
      let vezClickPersonagem = 2;
      botao.addEventListener('click', () => {
        
        const carregarCardsPersonagens = (6 * vezClickPersonagem);
        
        if(carregarCardsPersonagens < maximoPersonagens()){
          carregarPersonagens(carregarCardsPersonagens);
          vezClickPersonagem++;
        }else if(carregarCardsPersonagens == maximoPersonagens()){
          carregarPersonagens(carregarCardsPersonagens);
          botao.remove();
        }else{
          carregarPersonagens(maximoPersonagens());
          botao.remove();
        }
        
      })
      break;
      
      case 'episodios':
      let vezClickEpisodio = 2;
      botao.addEventListener('click', () => {
        
        const carregarCardsEpisodios = (6 * vezClickEpisodio);
        
        if(carregarCardsEpisodios < maximoEpisodios()){
          carregarEpisodios(carregarCardsEpisodios);
          vezClickEpisodio++;
        }else if(carregarCardsEpisodios == maximoEpisodios()){
          carregarEpisodios(carregarCardsEpisodios);
          botao.remove();
        }else{
          carregarEpisodios(maximoPersonagens());
          botao.remove();
        }
        
        adicionarEventoEpisodios();
      })
      break;
      
      case 'creditos':
      let vezClickCreditos = 2;
      botao.addEventListener('click', () => {
        
        const carregarCardsCreditos = (6 * vezClickCreditos);
        
        if(carregarCardsCreditos < maximoCreditos()){
          carregarCreditos(carregarCardsCreditos);
          vezClickCreditos++;
        }else if(carregarCardsCreditos == maximoCreditos()){
          carregarCreditos(carregarCardsCreditos);
          botao.remove();
        }else{
          carregarCreditos(maximoPersonagens());
          botao.remove();
        }
        
      })
      break;
      
      case 'todos-episódios':
      botao.addEventListener('click', (evento) => {
        evento.preventDefault();
        document.querySelector('section.episodios').style.display = 'block';
        window.location.href = '#todos-episodios';
      })
      break;
    }
  })
}

function escutaClickRecarregar(secao){
  
  const classe = secao.className;
  let titulo = null;
  
  switch(classe.toLowerCase()){
    case 'personagens':
    titulo = classe[0].toUpperCase() + classe.substr(1, classe.length);
    break;
    case 'episodios':
    titulo = 'Episódios';
    break;
    case 'creditos':
    titulo = 'Créditos';
    break;
  }
  
  secao.querySelector('h2').textContent = titulo;
  const btnVerMais = secao.querySelector('button.vermais');
  btnVerMais.querySelector('p').textContent = 'Ver Mais';
  btnVerMais.dataset.verMais = `${secao.className}`;
  
  secao.querySelectorAll('[data-recarregar]').forEach(botao => {
    botao.onclick = () => {
      limparPesquisa(secao)
    }
  })
}

function limparPesquisa(secao) {
  const nomeSecao = secao.className;
  const conteudo = secao.querySelector(`.${nomeSecao}__conteudo`);
  
  try{conteudo.parentElement.querySelector('div.feedback').remove()}catch{}
  
  switch(nomeSecao.toLowerCase()){
    case "personagens":
    conteudo.style.display = 'block';
    carregarPersonagens(6)
    break;
    
    case "episodios":
    conteudo.style.display = 'block';
    carregarEpisodios(6)
    break;
    
    case "creditos":
    conteudo.style.display = 'block';
    carregarCreditos(6)
    break;
  }
  
  escutaClickVerMais(6);
}

const atualizarLinks = () => {
  document.querySelectorAll('[data-link]').forEach(link => {
    switch(link.dataset.link){
      case "site-oficial":
      link.href = 'https://www.projetohumanos.com.br';
      break;
      case "comunidade-reddit":
      link.href = 'https://www.reddit.com/r/ProjetoHumanos/';
      break;
      case "ivan-mizanzuk":
      link.href = 'https://mizanzuk.com';
      break;
      case "orçamento":
      link.href = 'https://gabrieszin.github.io/portfolio/#formulario';
      break;
      case "portfolio-gabriel":
      link.href = 'https://gabrieszin.github.io/portfolio/';
      break;
      case "wiki-temporada":
      link.href = 'https://www.projetohumanos.com.br/wiki/altamira/';
      break;
      case "caso-evandro":
      link.href = 'https://www.projetohumanos.com.br/temporada/o-caso-evandro/';
      break;
      default:
      link.href = '';
      break;
    }
  })
}

const sortearEmbed = () => {
  const sorteio = Math.floor(Math.random() * 2);
  const embeds = document.querySelectorAll('[data-embed]');
  const recomendacao = document.querySelector('.recomendacao__conteudo');
  
  if(sorteio == 0){
    
    if(embeds[0] !== undefined){
      embeds[0].style.display = 'block';
      embeds[1].style.display = 'none';
      recomendacao.classList.value = 'recomendacao__conteudo';
    }
    
  }else{
    
    if(embeds[1] !== undefined){
      embeds[1].style.display = 'block';
      embeds[0].style.display = 'none';
      recomendacao.classList.value = 'recomendacao__conteudo embed-deezer';
    }
    
  }
}

const adicionarEventoEpisodios = () => {
  document.querySelectorAll('[data-redirecionar]').forEach(linkRedirecionar => {
    linkRedirecionar.addEventListener('click', (evento) => {
      if(!isEmpty(linkRedirecionar.dataset.redirecionar)){
        evento.preventDefault();
        const link = linkRedirecionar.dataset.redirecionar.trim();
        window.location.href = link;
      }
    })
  })
}

const escutaConfirmacaoNavegacao = () => {
  document.querySelectorAll('[data-confirmacao-navegacao]').forEach(botao => {
    botao.addEventListener('click', (evento) => {
      switch(evento.target.dataset.confirmacaoNavegacao){
        case "site-oficial":
        window.location.href = 'https://www.projetohumanos.com.br';
        break;
        case "continuar":
        localStorage.setItem('confirmacao-navegacao', true);
        $('#modal-confirmacao-navegacao').modal('hide');
      }
    })
  })
}

function escutarClickLista(lista, input){
  document.onclick = (evento) => {
    // evento.preventDefault();
    const alvo = evento.target;
    
    if(alvo.tagName.toLowerCase() == 'button' && alvo.parentElement.parentElement == lista && alvo.textContent.trim().length > 0){
      input.value = alvo.textContent.trim();
    }else{
      limparItensLista(lista)
    }
  }
}

function exibirFeedbackNenhumResultado(secao){
  
  if(isEmpty(secao.querySelector('.feedback'))){
    secao.innerHTML += `<div class="feedback sem-resultados"><i class="bi bi-exclamation-circle-fill"></i><p>Oops! Nenhum resultado foi encontrado. <span data-recarregar="personagens">Recarregar</span></p></div>`
  }
  
  const conteudo = secao.querySelector(`.${secao.className}__conteudo`);
  conteudo.style.display = 'none';
  
  escutaClickRecarregar(secao);
}

function limparItensLista(lista){
  lista.querySelectorAll('li').forEach(item => {
    item.remove();
  })
}

function limparArrayFiltro(array){
  while(array.length > 0){
    array.pop();
  }
}

export{
  verificarConfirmacaoNavegacao, 
  controleFechamentoModal, 
  escutaClickRecarregar, 
  atualizarLinks,
  sortearEmbed,
  escutaClickBotaoTema,
  adicionarEventoEpisodios,
  escutaConfirmacaoNavegacao,
  escutaClickVerMais,
  escutarClickLista,
  exibirFeedbackNenhumResultado,
  limparPesquisa,
  limparItensLista,
  limparArrayFiltro
}