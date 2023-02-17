import { trilhaSonoraController } from "../controller/trilhaSonoraController.js";
import { zeroEsquerda, segundosParaMinutos } from "../utilitarios/utilitarios.js";

const trilhas = trilhaSonoraController();
const player = document.querySelector('[data-player]');

const carregarTrilha = (nomeFaixa, condicao) => {
  const indice = trilhas.findIndex(trilha => trilha.getNome().toLowerCase().trim() == nomeFaixa.toLowerCase().trim());
  const idFaixa = trilhas[indice].getId();
  const reprodutor = player.querySelector('[data-reprodutor]');
  const titulo = player.querySelector('h3.player__titulo');
  
  reprodutor.src = `./assets/audios/${zeroEsquerda(2, idFaixa)}.mp3`;
  
  reprodutor.addEventListener('canplaythrough', () => {
    if(condicao == 'reproduzir'){
      reprodutor.play();
    }
    atualizarDados(trilhas[indice], reprodutor, titulo);
  })
  
}

const atualizarDados = ({nome}, audio, titulo) => {
  titulo.textContent = nome;
  atualizarTempoReproducao(audio)
  atualizarTempoReproduzindo(audio);
}

const atualizarTempoReproducao = (audio) => {
  const tempoF = player.querySelector('#fim');
  tempoF.textContent = segundosParaMinutos(Math.floor(audio.duration));
}

const atualizarTempoReproduzindo = (audio) => {
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

      playerReproducao.value = Math.floor((audio.currentTime * 100) / audio.duration);
      tempoR.textContent = segundosParaMinutos(Math.floor(audio.currentTime));      
    }
  }, 1000)
}

const alterarTempoAudio = (tempo, audio) => {
  audio.currentTime = Math.round((audio.duration * tempo) / 100);
}

const alterarReproducaoAudio = (audio) => {
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
  const playlist = document.querySelector('[data-playlist]');
  trilhas.forEach(trilha => {
    const item = document.createElement('li');
    const botao = document.createElement('button');
    botao.textContent = trilha.getNome();
    item.appendChild(botao);
    
    if(trilha.getNome().toLowerCase().trim() == 'Os Meninos de Altamira'.toLowerCase()){
      item.classList.add('ativo');
    }
    
    playlist.appendChild(item);
  }) 
}

const maximoTrilhas = () => {
  return trilhas.length;
}

export{
  carregarTrilha,
  carregarTrilhasPlaylist,
  maximoTrilhas,
  alterarTempoAudio,
  alterarReproducaoAudio
}