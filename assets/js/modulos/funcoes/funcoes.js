import { isEmpty } from "../utilitarios/utilitarios.js";
import { carregarPersonagens, maximoPersonagens } from "../view/personagensView.js";
import { carregarEpisodios, maximoEpisodios, dadosUltimoEpisodio } from "../view/episodiosView.js";
import { carregarCreditos, maximoCreditos } from "../view/creditosView.js";
import { escutaClickBotaoTema } from "./tema.js";

import {   
  alterarTempoAudio, 
  alterarReproducaoAudio,
  proximaFaixa,
  retrocederFaixa,
  alterarVolumeFaixa,
  adicionarClasseAtivoFaixa,
  carregarTrilha, 
} from "../view/trilhaSonoraView.js"

const verificarConfirmacaoNavegacao = () => {
  let confirmacao = null;
  
  try{
    confirmacao = JSON.parse(localStorage.getItem('confirmacao-navegacao'));
  }catch(error){
    console.log('Valor informado para confirmar a navegação não é válido');
  }

  if(isEmpty(confirmacao) || !confirmacao){
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
        
        escutaTooltip();
      })
      break;
      
      case 'todos-episódios':
      botao.addEventListener('click', (evento) => {
        evento.preventDefault();
        document.querySelector('section.ultimos-episodios').style.display = 'none';
        document.querySelector('section.episodios').style.display = 'block';
        // window.location.href = '#todos-episodios';
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

  btnVerMais.classList.remove('none');
  btnVerMais.style.display = 'flex';
  
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
      link.href = 'https://gabriersdev.github.io/portfolio/#formulario';
      break;
      case "portfolio-gabriel":
      link.href = 'https://gabriersdev.github.io/portfolio/';
      break;
      case "wiki-temporada":
      link.href = 'https://www.projetohumanos.com.br/wiki/altamira/';
      break;
      case "caso-evandro":
      link.href = 'https://www.projetohumanos.com.br/temporada/o-caso-evandro/';
      break;
      case "creditos-temporada":
      link.href = 'https://www.projetohumanos.com.br/altamira/creditos-fontes-e-agradecimentos-2/';
      break;
      default:
      link.href = '';
      break;
    }
  })
}

function atualizarInformacoesEmbed(){
  document.querySelectorAll('[data-embed]').forEach(embed => {
    const dados = dadosUltimoEpisodio();
    if(!isEmpty(dados)){
      embed.dataset.bsContent = `Último Episódio: ${dados.nome}. Descrição: ${dados.descricao}`;
    }else{
      embed.dataset.bsContent = 'Último Episódio';
    }
  })
}

const sortearEmbed = () => {
  // const sorteio = Math.floor(Math.random() * 2);
  const sorteio = 1; // Apenas o deezer
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
        localStorage.setItem('confirmacao-navegacao', JSON.stringify(true));
        $('#modal-confirmacao-navegacao').modal('hide');
      }
    })
  })
}

function escutarClickLista(lista, input){
  document.onclick = (evento) => {
    // evento.preventDefault();
    const alvo = evento.target;
    
    try{
      if(alvo.tagName.toLowerCase() == 'button' && alvo.parentElement.parentElement == lista && alvo.textContent.trim().length > 0){
        input.value = alvo.textContent.trim();
      }else{
        limparItensLista(lista)
      }
    }catch(error){
      
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

function escutaClickPlaylist(){
  document.querySelector('[data-playlist]').addEventListener('click', (evento) => {
    
    if(evento.target.tagName.toLowerCase() == 'button'){
      adicionarClasseAtivoFaixa(evento.target.textContent);
      // console.log('Música Selecionada:', evento.target.textContent);
      carregarTrilha(evento.target.textContent, 'reproduzir');
    }
  })
}

function escutaClickPlayer(){
  const player = document.querySelector('[data-player]');
  
  player.querySelector('#voltar').onclick = () => {
    if(!retrocederFaixa()){
      //
    }
  }
  
  player.querySelector('#play').onclick = () => {
    alterarReproducaoAudio();
  }
  
  player.querySelector('#proximo').onclick = () => {
    if(!proximaFaixa()){
      //
    }
  }
  
  const range = player.querySelector('input[type=range].player__reproducao');
  
  range.addEventListener('input', (evento) => {
    alterarTempo(evento);
  })
  
  range.addEventListener('change', (evento) => {
    alterarTempo(evento);
  })
  
  function alterarTempo(evento){
    alterarTempoAudio(evento.target.value);
  }
}

function escutaClickFaixaSom(){
  const ajusteSom = document.querySelector('.ajuste-som');
  const range = ajusteSom.querySelector('input[type=range].ajuste-som__controle');
  
  range.addEventListener('input', (evento) => {
    alterarVolume(evento);
  })
  
  range.addEventListener('change', (evento) => {
    alterarVolume(evento);
  })
  
  function alterarVolume(evento){
    alterarVolumeFaixa(evento.target.value);
  }
}

function pesquisarNoConteudo(filtro, view, valor){
  limparArrayFiltro(filtro);
  const buscas = view.buscarNoNomePorPalavra(valor).concat(view.buscarNaDescricaoPorPalavra(valor).concat(view.buscarNoNome(valor).concat(view.buscarNaDescricao(valor))))
  buscas.forEach(busca => {
    if(!filtro.includes(busca)){
      filtro.push(busca);
    }
  }) 
  
  return filtro;
}

function alimentarLista(filtro, lista, input){
  filtro.slice(0, 5).forEach(itemFiltro => {
    const item = document.createElement('li');
    const botao = document.createElement('button');
    botao.textContent = itemFiltro.nome;
    item.appendChild(botao);
    lista.appendChild(item);
  })
  escutarClickLista(lista, input);
}

function exibirResultados(secao, lista){
  const section = document.querySelector(`.${secao}`);
  const btnVerMais = section.querySelector('button.vermais');
  btnVerMais.querySelector('p').textContent = 'Mais Resultados';
  btnVerMais.dataset.verMais = `resultados-${secao}`;
  
  section.querySelector('h2').textContent = 'Resultados para a Busca'
  limparPesquisa(section);
  escutarClickVerMaisResultados(section, lista);
  
  switch(secao){
    case "personagens":
    carregarPersonagens(6, lista);
    break;
    
    case "episodios":
    carregarEpisodios(6, lista);
    break;
    
    case "creditos":
    carregarCreditos(6, lista);
    break;
  }    
}

function escutarClickVerMaisResultados(secao, lista){
  let qtdeCardsInicial = 12;
  const botao = secao.querySelector(`[data-ver-mais=resultados-${secao.className}]`);
  
  if(6 > lista.length){
    botao.style.display = 'none'
  }
  
  botao.onclick = () => {
    if(qtdeCardsInicial < lista.length){
      carregarPersonagens(qtdeCardsInicial, lista);
      qtdeCardsInicial += 6;
    }else{
      carregarPersonagens(lista.length, lista);
      botao.style.display = 'none'
    }
  }
}

const escutaTooltip = () => {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
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
  limparArrayFiltro,
  pesquisarNoConteudo,
  alimentarLista,
  exibirResultados,
  escutarClickVerMaisResultados,
  escutaClickPlaylist,
  escutaClickPlayer,
  escutaClickFaixaSom,
  atualizarInformacoesEmbed,
  escutaTooltip
}