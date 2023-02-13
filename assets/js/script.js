import { carregarCreditos, maximoCreditos } from "./modulos/view/creditosView.js";
import { carregarPersonagens, maximoPersonagens } from "./modulos/view/personagensView.js";
carregarCreditos();

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
            //carregarEpisodios(qtdeCardsInicial * vezClickEpisodio);
            vezClickEpisodio++;
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
    
  }
})();