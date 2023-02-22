import { isEmpty } from "../utilitarios/utilitarios.js";

const verificarTema = () => {
  const tema = JSON.parse(localStorage.getItem('tema'));
  if(!isEmpty(tema) && tema == 'claro' || tema == 'escuro'){
    trocarTema(tema);
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
        localStorage.setItem('tema', JSON.stringify('claro'));
        trocarTema('claro');
        break;
        
        case 'escuro':
        localStorage.setItem('tema', JSON.stringify('escuro'));
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