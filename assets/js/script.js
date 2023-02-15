import { buscarNaDescricao, buscarNaDescricaoPorPalavra, buscarNoNome, buscarNoNomePorPalavra } from "./modulos/controller/personagensController.js";
import { isEmpty } from "./modulos/utilitarios/utilitarios.js";
import { carregarCreditos, maximoCreditos } from "./modulos/view/creditosView.js";
import { carregarEpisodios, maximoEpisodios, carregarUltimosEpisodios } from "./modulos/view/episodiosView.js";
import { carregarPersonagens, maximoPersonagens } from "./modulos/view/personagensView.js";

import {
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
  
  const escutaClickVerMais = () => {
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
        
        case 'episódios':
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
        
        case 'créditos':
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
  escutaClickVerMais();
  
  const pesquisa = () => {
    document.querySelectorAll('input').forEach(input => {
      
      const filtroPersonagens = new Array();
      const personagens = document.querySelector('section.personagens');
      
      input.parentElement.parentElement.querySelector('button[type=submit]').addEventListener('click', (evento) => {
        input.setCustomValidity('');
        evento.preventDefault();  
        
        if(input.validity.valueMissing){
          $(input).tooltip('show');
          input.focus();
        }else{
          //Pesquisa através do botão
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
          }else{
            const conteudo = personagens.querySelector('.personagens__conteudo');
            conteudo.innerHTML = `<div class="feedback sem-resultados"><i class="bi bi-exclamation-circle-fill"></i><p>Oops! Nenhum resultado foi encontrado. <span data-recarregar="personagens">Recarregar</span></p></div>`
            escutaClickRecarregar();
          }
          
          break;
        }
      })
    });
  }
  
  pesquisa();  
  
  window.onload = async () => {
    const dataAtual = new Date();
    verificarConfirmacaoNavegacao();
    atualizarDatas();
  }
  
  verificarTema();
  atualizarLinks();  
  sortearEmbed();
  escutaClickBotaoTema();
  controleFechamentoModal();
  escutaConfirmacaoNavegacao();
  adicionarEventoEpisodios();
  
})();