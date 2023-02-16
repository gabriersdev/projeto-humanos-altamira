import { verificarTema, escutaClickBotaoTema } from "./modulos/funcoes/tema.js";
import { atualizarDatas, isEmpty } from "./modulos/utilitarios/utilitarios.js";
import { carregarCreditos } from "./modulos/view/creditosView.js";
import { carregarEpisodios, carregarUltimosEpisodios } from "./modulos/view/episodiosView.js";
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
  limparItensLista,
  limparArrayFiltro
} from "./modulos/funcoes/funcoes.js"

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
      
      input.parentElement.parentElement.querySelector('button[type=submit]').addEventListener('click', (evento) => {
        const secaoInput = (input.className.split('__'))[0].toLowerCase();
        input.setCustomValidity('');
        evento.preventDefault();  
        
        if(input.validity.valueMissing){
          // $(input).tooltip('show');
          input.focus();
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
    
    switch(secao){
      case "personagens":
      carregarPersonagens(6, lista);
      escutarClickVerMaisResultados(section, lista);
      break;
      
      case "episodios":
      console.log('episódios');
      break;
      
      case "créditos":
      console.log('créditos')
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
  
  verificarTema();
  atualizarLinks();  
  sortearEmbed();
  escutaClickBotaoTema();
  controleFechamentoModal();
  escutaConfirmacaoNavegacao();
  adicionarEventoEpisodios();
  
})();