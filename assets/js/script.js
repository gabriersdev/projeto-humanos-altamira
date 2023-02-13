import { isEmpty } from "./modulos/utilitarios/utilitarios.js";
import { carregarCreditos, maximoCreditos } from "./modulos/view/creditosView.js";
import { carregarEpisodios, maximoEpisodios, carregarUltimosEpisodios } from "./modulos/view/episodiosView.js";
import { carregarPersonagens, maximoPersonagens } from "./modulos/view/personagensView.js";

(() => {
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });
  
  document.querySelectorAll('input').forEach(input => {
    
    input.parentElement.querySelector('button[type=submit]').addEventListener('click', (evento) => {
      
      input.setCustomValidity('');
      evento.preventDefault();
      
      if(input.validity.valueMissing){
        $(input).tooltip('show');
        input.focus();
      }
    })
  });
  
  window.onload = () => {
    const dataAtual = new Date();
    
    document.querySelectorAll("[data-ano-atual]").forEach(area => {
      area.textContent = `${dataAtual.getFullYear()}`;
    })
    
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
      }
    })
    
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
    
    sortearEmbed();
    
    const qtdeCardsInicial = 6;
    carregarPersonagens(qtdeCardsInicial);
    carregarCreditos(qtdeCardsInicial);
    carregarEpisodios(qtdeCardsInicial);
    carregarUltimosEpisodios(5);
    
    const btnsVerMais = document.querySelectorAll('[data-ver-mais]');
    btnsVerMais.forEach(botao => {
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
      }
    })
    
    const verificarTema = () => {
      if(!isEmpty(localStorage.getItem('tema'))){
        trocarTema(localStorage.getItem('tema'));
      }
    }

    const trocarTema = (tema) => {
      const head = document.querySelector('head');
      const arquivoTema = head.querySelector('[data-import="arquivo-tema"]');

      switch(tema){
        case 'claro':
          arquivoTema.href = './assets/css/temas/tema-claro.css';
          document.querySelector('[data-tema="claro"]').classList.toggle('ativo');
        break;

        case 'escuro':
          arquivoTema.href = './assets/css/temas/tema-escuro.css';
          document.querySelector('[data-tema="escuro"]').classList.toggle('ativo');
        break;
      }
    }

    verificarTema();

    const btnTemas = document.querySelectorAll('[data-tema]');
    btnTemas.forEach(botao => {

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
})();