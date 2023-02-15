import { isEmpty } from "../utilitarios/utilitarios.js";
import { carregarPersonagens } from "../view/personagensView.js";

const atualizarDatas = () => {
  const dataAtual = new Date();
  document.querySelectorAll("[data-ano-atual]").forEach(area => {
    area.textContent = `${dataAtual.getFullYear()}`;
  })
} 

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

function escutaClickRecarregar(){
  document.querySelectorAll('[data-recarregar]').forEach(botao => {
    botao.onclick = () => {
      console.log('clicou');
      switch(botao.dataset.recarregar){
        case "personagens":
          carregarPersonagens(qtdeCardsInicial);
          break;
      }
    }
  })
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

const verificarTema = () => {
  if(!isEmpty(localStorage.getItem('tema'))){
    trocarTema(localStorage.getItem('tema'));
  }else{
    trocarTema('escuro');
  }
}

const trocarTema = (tema) => {
  const head = document.querySelector('head');
  const arquivoTema = head.querySelector('[data-import="arquivo-tema"]');
  
  const btnClaro = document.querySelector('[data-tema="claro"]');
  const btnEscuro = document.querySelector('[data-tema="escuro"]')
  
  switch(tema){
    case 'claro':
    arquivoTema.href = './assets/css/temas/tema-claro.css';
    btnClaro.classList.add('ativo');
    btnEscuro.classList.remove('ativo');
    break;
    
    case 'escuro':
    arquivoTema.href = './assets/css/temas/tema-escuro.css';
    btnEscuro.classList.add('ativo');
    btnClaro.classList.remove('ativo');
    break;
  }
}

const escutaClickBotaoTema = () => {
  document.querySelectorAll('[data-tema]').forEach(botao => {
    botao.addEventListener('click', () => {
      switch(botao.dataset.tema){
        case 'claro':
        localStorage.setItem('tema', 'claro');
        trocarTema('claro');
        break;
        
        case 'escuro':
        localStorage.setItem('tema', 'escuro');
        trocarTema('escuro');
        break;
      }
    })
  })
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
    evento.preventDefault();
    
    if(evento.target.tagName.toLowerCase() == 'button' && evento.target.parentElement.parentElement == lista && evento.target.textContent.trim().length > 0){
      input.value = evento.target.textContent.trim();
    }else{
      limparItensLista(lista)
    }
  }
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
  atualizarDatas, 
  verificarConfirmacaoNavegacao, 
  controleFechamentoModal, 
  escutaClickRecarregar, 
  atualizarLinks,
  sortearEmbed,
  verificarTema,
  trocarTema,
  escutaClickBotaoTema,
  adicionarEventoEpisodios,
  escutaConfirmacaoNavegacao,
  escutarClickLista,
  limparItensLista,
  limparArrayFiltro
}