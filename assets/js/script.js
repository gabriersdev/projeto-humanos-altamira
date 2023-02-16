import { 
  buscarNaDescricao, 
  buscarNaDescricaoPorPalavra, 
  buscarNoNome, 
  buscarNoNomePorPalavra 
} from "./modulos/controller/personagensController.js";

import { verificarTema, escutaClickBotaoTema } from "./modulos/funcoes/tema.js";
import { atualizarDatas, isEmpty } from "./modulos/utilitarios/utilitarios.js";
import { carregarCreditos } from "./modulos/view/creditosView.js";
import { carregarEpisodios, carregarUltimosEpisodios } from "./modulos/view/episodiosView.js";
import { carregarPersonagens } from "./modulos/view/personagensView.js";

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
      
      input.parentElement.parentElement.querySelector('button[type=submit]').addEventListener('click', (evento) => {
        const secaoInput = (input.className.split('__'))[0];
        input.setCustomValidity('');
        evento.preventDefault();  
        
        if(input.validity.valueMissing){
          // $(input).tooltip('show');
          input.focus();
        }else{
          if(!isEmpty(filtroPersonagens)){
            carregarResultadosPesquisa(secaoInput, filtroPersonagens)
          }else{
            exibirFeedbackNenhumResultado();
          }
        }
      })
      
      input.addEventListener('input', () => {
        const valor = input.value.toLowerCase();
        const lista = input.parentElement.querySelector('ul.autocomplete__lista');
        
        switch(input.className){
          case 'personagens__busca__input':
          
          if(!isEmpty(valor)){
            limparArrayFiltro(filtroPersonagens);
            const buscas = buscarNoNomePorPalavra(valor).concat(buscarNaDescricaoPorPalavra(valor).concat(buscarNoNome(valor).concat(buscarNaDescricao(valor))))
            buscas.forEach(busca => {
              if(!filtroPersonagens.includes(busca)){
                filtroPersonagens.push(busca);
              }
            }) 
          }
          
          limparItensLista(lista);
          
          if(!isEmpty(filtroPersonagens)){
            filtroPersonagens.slice(0, 5).forEach(personagem => {
              const item = document.createElement('li');
              const botao = document.createElement('button');
              botao.textContent = personagem.nome;
              item.appendChild(botao);
              lista.appendChild(item);
            })
            escutarClickLista(lista, input);
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
  
  function carregarResultadosPesquisa(secao, lista){
    const section = document.querySelector(`.${secao}`);
    
    const btnVerMais = section.querySelector('button.vermais');
    btnVerMais.querySelector('p').textContent = 'Ver + resultados';
    btnVerMais.dataset.verMaisResultados = '';
    
    section.querySelector('h2').textContent = 'Resultados para a Busca'
    
    switch(secao){
      case "personagens":
      carregarPersonagens(6, lista);
      break;
      
      case "episodios":
      console.log('episódios');
      break;
      
      case "créditos":
      console.log('créditos')
      break;
    }
    
    function exibirResultados(){
      
    }
    
    function escutarClickVerMaisResultados(){
      
    }
    
    function limparResultados(){
      
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