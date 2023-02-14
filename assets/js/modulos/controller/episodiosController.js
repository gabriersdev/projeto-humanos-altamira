import { EpisodiosModel } from "../model/episodiosModel.js";
import { episodiosConteudos } from "../conteudo/episodiosConteudo.js";
import { isEmpty, zeroEsquerda } from "../utilitarios/utilitarios.js";

const episodiosController = () => {
  const episodios = new Array();

  episodiosConteudos.forEach((episodio) => {
    
    let episodioModel;
    let numero = parseInt((episodio.nome.split(' - '))[0]);

    if(episodio.img !== undefined){
      episodioModel = new EpisodiosModel(episodio.nome.trim(), episodio.descricao.trim(), episodio.link.trim(), `./assets/img/episodios-thumbs/${episodio.img.trim()}`);
      episodioModel.setWiki(`https://www.projetohumanos.com.br/wiki/altamira/extras/extras-episodio-${zeroEsquerda(2, numero)}/`);
    }else{
      episodioModel = new EpisodiosModel(episodio.nome.trim(), episodio.descricao.trim(), episodio.link.trim(), `./assets/img/episodios-thumbs/episodio-${zeroEsquerda(2, numero)}.png`);
      episodioModel.setWiki(`https://www.projetohumanos.com.br/wiki/altamira/extras/extras-episodio-${zeroEsquerda(2, numero)}/`);
    }

    episodios.push(episodioModel);
  })

  return episodios;
}

export{
  episodiosController
}