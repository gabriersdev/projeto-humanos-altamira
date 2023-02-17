import { trilhaSonoraController } from "../controller/trilhaSonoraController.js";
import { zeroEsquerda, segundosParaMinutos } from "../utilitarios/utilitarios.js";

const trilhas = trilhaSonoraController();

const carregarTrilha = (nomeFaixa, condicao) => {
  
  const indice = trilhas.findIndex(trilha => trilha.getNome().toLowerCase().trim() == nomeFaixa.toLowerCase().trim());
  const idFaixa = trilhas[indice].getId();
  
  const player = document.querySelector('[data-player]');
  const reprodutor = player.querySelector('[data-reprodutor]');
  const tempoR = player.querySelector('#reproduzindo');
  const tempoF = player.querySelector('#fim');
  const titulo = player.querySelector('h3.player__titulo');
  const playerReproducao = player.querySelector('.player__reproducao');
  
  reprodutor.src = `./assets/audios/${zeroEsquerda(2, idFaixa)}.mp3`;
  
  reprodutor.addEventListener('canplaythrough', () => {
    if(condicao == 'reproduzir'){
      reprodutor.play();
    }
    atualizarDados(trilhas[indice], reprodutor, titulo, tempoR, tempoF, playerReproducao);
  })
  
}

const atualizarDados = ({nome}, audio, titulo, tempoR, tempoF, playerReproducao) => {
  titulo.textContent = nome;
  atualizarTempoReproducao(tempoF, audio)
  atualizarTempoReproduzindo(tempoR, audio, playerReproducao);
}

const atualizarTempoReproducao = (elemento, audio) => {
  elemento.textContent = segundosParaMinutos(Math.floor(audio.duration));
}

const atualizarTempoReproduzindo = (elemento, audio, playerReproducao) => {
  const intervalo = setInterval(() => {
    playerReproducao.value = Math.floor((audio.currentTime * 100) / audio.duration);
    elemento.textContent = segundosParaMinutos(Math.floor(audio.currentTime));
  }, 1000)
  
  setTimeout(() => {
    playerReproducao.value = 100;
    clearInterval(intervalo);
  }, audio.duration * 1000);
}

const alterarTempoAudio = (tempo, audio) => {
  audio.currentTime = Math.round((audio.duration * tempo) / 100);
}

const alterarReproducaoAudio = (audio, botao) => {
  if(audio.paused){
    audio.play();
    botao.innerHTML = `<i class="bi bi-pause-circle"></i>`;
  }else{
    audio.pause();
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