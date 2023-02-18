import { verificarTema, escutaClickBotaoTema } from "./modulos/funcoes/tema.js";
import { atualizarDatas, isEmpty } from "./modulos/utilitarios/utilitarios.js";
import { carregarCreditos, consultaCreditosView } from "./modulos/view/creditosView.js";
import { carregarEpisodios, carregarUltimosEpisodios, consultaEpisodiosView } from "./modulos/view/episodiosView.js";
import { carregarPersonagens, consultaPersonagensView } from "./modulos/view/personagensView.js";

import { 
  verificarConfirmacaoNavegacao, 
  controleFechamentoModal,
  atualizarLinks,
  sortearEmbed,
  adicionarEventoEpisodios,
  escutaConfirmacaoNavegacao,
  escutaClickVerMais,
  escutarClickLista,
  exibirFeedbackNenhumResultado,
  limparPesquisa,
  limparItensLista,
  limparArrayFiltro
} from "./modulos/funcoes/funcoes.js"

import { 
  carregarTrilha, 
  carregarTrilhasPlaylist, 
  alterarTempoAudio, 
  alterarReproducaoAudio, 
  adicionarClasseAtivoFaixa,
  proximaFaixa,
  retrocederFaixa,
  alterarVolumeFaixa
} from "./modulos/view/trilhaSonoraView.js";

(() => {
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });
  
  const qtdeCardsInicial = 6;
  
  carregarPersonagens(qtdeCardsInicial);
  carregarCreditos(qtdeCardsInicial);
  carregarEpisodios(qtdeCardsInicial);
  carregarUltimosEpisodios(5);
  
  escutaClickVerMais();

  const pesquisa = () => {
    document.querySelectorAll('input[type=text]').forEach(input => {
      
      const filtroPersonagens = new Array();
      const filtroEpisodios = new Array();
      const filtroCreditos = new Array();
      
      const personagens = document.querySelector('section.personagens');
      const episodios = document.querySelector('section.episodios');
      const creditos = document.querySelector('section.creditos');
      
      input.parentElement.parentElement.addEventListener('submit', (evento) => {
        const secaoInput = (input.className.split('__'))[0].toLowerCase();
        input.setCustomValidity('');
        evento.preventDefault();

        if(input.validity.valueMissing){
          // $(input).tooltip('show');
          // input.focus();
        }else{
          switch(secaoInput){
            case "personagens":
            if(!isEmpty(filtroPersonagens)){
              exibirResultados(secaoInput, filtroPersonagens);
            }else{
              exibirFeedbackNenhumResultado(personagens);
              pesquisa();
            }
            break;
            
            case "episodios":
            if(!isEmpty(filtroEpisodios)){
              exibirResultados(secaoInput, filtroEpisodios);
            }else{
              exibirFeedbackNenhumResultado(episodios);
              pesquisa();
            }
            break;
            
            case "creditos":
            if(!isEmpty(filtroCreditos)){
              exibirResultados(secaoInput, filtroCreditos);
            }else{
              exibirFeedbackNenhumResultado(creditos);
              pesquisa();
            } 
            break;
          }
        }
      })
      
      input.addEventListener('input', () => {
        const valor = input.value.toLowerCase();
        const lista = input.parentElement.querySelector('ul.autocomplete__lista');
        
        switch((input.className.split('__'))[0]){
          case 'personagens':
          if(!isEmpty(valor)){
            filtroPersonagens.concat(pesquisarNoConteudo(filtroPersonagens, consultaPersonagensView, valor))
          }
          limparItensLista(lista);
          if(!isEmpty(filtroPersonagens)){
            alimentarLista(filtroPersonagens, lista, input);
          }
          break;
          
          case 'creditos':
          if(!isEmpty(valor)){
            filtroCreditos.concat(pesquisarNoConteudo(filtroCreditos, consultaCreditosView, valor))
          }
          limparItensLista(lista);
          if(!isEmpty(filtroCreditos)){
            alimentarLista(filtroCreditos, lista, input);
          }
          break;
          
          case 'episodios':
          if(!isEmpty(valor)){
            filtroEpisodios.concat(pesquisarNoConteudo(filtroEpisodios, consultaEpisodiosView, valor))
          }
          limparItensLista(lista);
          if(!isEmpty(filtroEpisodios)){
            alimentarLista(filtroEpisodios, lista, input);
          }
          break;
          
        }
      })
    });
  }
  
  pesquisa();  
  
  window.onload = async () => {
    verificarConfirmacaoNavegacao();
    atualizarDatas();
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
  
  carregarTrilhasPlaylist();
  
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
  
  carregarTrilha('Os Meninos de Altamira');
  adicionarClasseAtivoFaixa('Os Meninos de Altamira');

  escutaClickPlayer();
  escutaClickPlaylist();
  escutaClickFaixaSom();
  
  verificarTema();
  atualizarLinks();  
  sortearEmbed();
  escutaClickBotaoTema();
  controleFechamentoModal();
  escutaConfirmacaoNavegacao();
  adicionarEventoEpisodios();
  
})();