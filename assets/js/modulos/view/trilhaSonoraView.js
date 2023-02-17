import { trilhaSonoraController } from "../controller/trilhaSonoraController.js";

const trilhas = trilhaSonoraController();

const carregarTrilha = (nomeFaixa) => {

  const indice = trilhas.findIndex(trilha => trilha.getNome().toLowerCase().trim() == nomeFaixa.toLowerCase().trim());
  console.log(indice);

}

const carregarTrilhasPlaylist = () => {
  const playlist = document.querySelector('[data-playlist]');
  trilhas.forEach(trilha => {
    const item = document.createElement('li');
    const botao = document.createElement('button');
    botao.textContent = trilha.getNome();
    item.appendChild(botao);
    playlist.appendChild(item);
  }) 
}

const maximoTrilhas = () => {
  return trilhas.length;
}

export{
  carregarTrilha,
  carregarTrilhasPlaylist,
  maximoTrilhas
}