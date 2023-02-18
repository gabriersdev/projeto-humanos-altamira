import { trilhaSonoraController } from "../controller/trilhaSonoraController.js";
import { zeroEsquerda, segundosParaMinutos } from "../utilitarios/utilitarios.js";

const trilhas = trilhaSonoraController();
const player = document.querySelector('[data-player]');
const playlist = player.querySelector('[data-playlist]');
const audio = player.querySelector('[data-reprodutor]');
audio.volume = 0.3;
const titulo = player.querySelector('h3.player__titulo');

const carregarTrilha = (nomeFaixaAtual, condicao) => {
  const indice = trilhas.findIndex(trilha => trilha.getNome().toLowerCase().trim() == nomeFaixaAtual.toLowerCase().trim());
  const idFaixa = trilhas[indice].getId();
  
  audio.src = `./assets/audios/${zeroEsquerda(2, idFaixa)}.mp3`;
  
  audio.addEventListener('canplaythrough', () => {
    if(condicao == 'reproduzir'){
      audio.play();
    }
    atualizarDados(trilhas[indice]);
  });

  if((indice + 1)== maximoTrilhas()){
    player.querySelector('#proximo').style.cursor = 'not-allowed';
    player.querySelector('#proximo').style.opacity = '0.5';
  }else{
    player.querySelector('#proximo').style.cursor = 'pointer';
    player.querySelector('#proximo').style.opacity = '1';
  }

  if(indice == 0){
    player.querySelector('#voltar').style.cursor = 'not-allowed';
    player.querySelector('#voltar').style.opacity = '0.5';
  }else{
    player.querySelector('#voltar').style.cursor = 'pointer';
    player.querySelector('#voltar').style.opacity = '1';
  }

  audio.addEventListener('ended', () => {
    proximaFaixa();
  })
}

const retrocederFaixa = () => {
  const indice = retornarIndiceFaixaAtual();

  if((indice - 1) >= 0){
    const dadosFaixa = trilhas[indice - 1];
    carregarTrilha(dadosFaixa.getNome(), 'reproduzir');
    adicionarClasseAtivoFaixa(dadosFaixa.getNome());
    return true;
  }

  return false;
}

const retornarIndiceFaixaAtual = () => {
  const nomeFaixaAtual = titulo.textContent;
  return trilhas.findIndex(trilha => trilha.getNome().toLowerCase().trim() == nomeFaixaAtual.toLowerCase().trim());
}

const proximaFaixa = () => {
  const indice = retornarIndiceFaixaAtual();

  if((indice + 1) < maximoTrilhas()){
    const dadosFaixa = trilhas[indice + 1];
    carregarTrilha(dadosFaixa.getNome(), 'reproduzir');
    adicionarClasseAtivoFaixa(dadosFaixa.getNome());
    return true;
  }

  return false;
}

const atualizarDados = ({nome}) => {
  titulo.textContent = nome;
  atualizarTempoReproducao()
  atualizarTempoReproduzindo();
}

const atualizarTempoReproducao = () => {
  const tempoF = player.querySelector('#fim');
  tempoF.textContent = segundosParaMinutos(Math.round(audio.duration));
}

const atualizarTempoReproduzindo = () => {
  const tempoR = player.querySelector('#reproduzindo');
  const playerReproducao = player.querySelector('.player__reproducao');
  
  const intervalo = setInterval(() => {
    if(audio.currentTime == audio.duration){
      alterarIconeBTNPlay('pause');
      playerReproducao.value = 100;
      clearInterval(intervalo);
    }else{
      
      if(!audio.paused){
        alterarIconeBTNPlay('play');
      }

      playerReproducao.value = Math.round((audio.currentTime * 100) / audio.duration);
      tempoR.textContent = segundosParaMinutos(Math.round(audio.currentTime));      
    }
  }, 1000)
}

const alterarTempoAudio = (tempo) => {
  audio.currentTime = Math.round((audio.duration * tempo) / 100);
}

const alterarReproducaoAudio = () => {
  if(audio.paused){
    audio.play();
    alterarIconeBTNPlay('play');
  }else{
    audio.pause();
    alterarIconeBTNPlay('pause');
  }
}

const alterarIconeBTNPlay = (condicao) => {
  const botao = player.querySelector('#play');
  if(condicao == 'play'){
    botao.innerHTML = `<i class="bi bi-pause-circle"></i>`;
  }else{
    botao.innerHTML = `<i class="bi bi-play-circle"></i>`;
  }
}

const carregarTrilhasPlaylist = () => {
  trilhas.forEach(trilha => {
    const item = document.createElement('li');
    const botao = document.createElement('button');
    botao.textContent = trilha.getNome();
    item.appendChild(botao);
    
    playlist.appendChild(item);
  }) 
}

function removerClasseAtivoFaixas(){
  playlist.querySelectorAll('li').forEach(item => {
    if(item.classList.contains('ativo')){
      item.classList.remove('ativo');
    }
  })
}

function adicionarClasseAtivoFaixa(nomeFaixa){
  removerClasseAtivoFaixas();
  playlist.querySelectorAll('li').forEach(item => {
    if(item.textContent.toLowerCase().trim() == nomeFaixa.toLowerCase().trim()){
      item.classList.add('ativo');
    }
  })
}

function alterarVolumeFaixa(valor){
  audio.volume = (valor / 100);
}

const maximoTrilhas = () => {
  return trilhas.length;
}

export{
  carregarTrilha,
  retrocederFaixa,
  proximaFaixa,
  carregarTrilhasPlaylist,
  removerClasseAtivoFaixas,
  adicionarClasseAtivoFaixa,
  maximoTrilhas,
  alterarTempoAudio,
  alterarReproducaoAudio,
  alterarVolumeFaixa
}