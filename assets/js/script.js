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
  exibirFeedbackNenhumResultado,
  limparItensLista,
  pesquisarNoConteudo,
  alimentarLista,
  exibirResultados,
  escutaClickPlaylist,
  escutaClickPlayer,
  escutaClickFaixaSom,
} from "./modulos/funcoes/funcoes.js"

import { 
  carregarTrilha, 
  carregarTrilhasPlaylist,
  adicionarClasseAtivoFaixa,
  verificarFaixaRegistrada,
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

    const musicaRegistrada = verificarFaixaRegistrada()
    if(!isEmpty(musicaRegistrada)){
      carregarTrilha(musicaRegistrada);
      adicionarClasseAtivoFaixa(musicaRegistrada);
    }else{
      carregarTrilha('Os Meninos de Altamira');
      adicionarClasseAtivoFaixa('Os Meninos de Altamira');
    }

    document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
      botao.addEventListener('click', () => {
        window.location.reload;
      })
    })

    verificarConfirmacaoNavegacao();
    atualizarDatas();
  }
  
  carregarTrilhasPlaylist();
  escutaClickPlayer();
  escutaClickPlaylist();
  escutaClickFaixaSom();
  
  verificarTema();
  escutaClickBotaoTema();
  atualizarLinks();  
  sortearEmbed();
  controleFechamentoModal();
  escutaConfirmacaoNavegacao();
  adicionarEventoEpisodios();
  
})();