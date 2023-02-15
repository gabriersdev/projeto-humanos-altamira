import { buscarNaDescricao, buscarNaDescricaoPorPalavra, buscarNoNome, buscarNoNomePorPalavra } from "./modulos/controller/personagensController.js";
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

    const filtroPersonagens = new Array();

    input.addEventListener('input', (evento) => {
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

  const controleFechamentoModal = () => {
    const modais = document.querySelectorAll('.modal');
    modais.forEach(modal => {
      const btnFecha = modal.querySelector('[data-modal-fecha]');
      btnFecha.addEventListener('click', () => {
        $('#' + modal.id).modal('hide');
      })
    })
  }
  
  controleFechamentoModal();
  
  window.onload = async () => {
    const dataAtual = new Date();
    
    const verificarConfirmacaoNavegacao = () => {
      if(isEmpty(localStorage.getItem('confirmacao-navegacao'))){
        $('#modal-confirmacao-navegacao').modal('show');
      }
    }

    verificarConfirmacaoNavegacao();

    document.querySelectorAll("[data-ano-atual]").forEach(area => {
      area.textContent = `${dataAtual.getFullYear()}`;
    })
  }
  
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
  
  adicionarEventoEpisodios();
  
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
  escutaConfirmacaoNavegacao();

})();