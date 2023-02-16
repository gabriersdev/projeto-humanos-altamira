import { isEmpty } from "../utilitarios/utilitarios.js";

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

export{
  verificarTema,
  trocarTema,
  escutaClickBotaoTema
}