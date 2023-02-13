import { EpisodiosModel } from "../model/episodiosModel.js";
import { episodiosConteudos } from "../conteudo/episodiosConteudo.js";
import { isEmpty, zeroEsquerda } from "../utilitarios/utilitarios.js";

const episodiosController = () => {
  const episodios = new Array();

  episodiosConteudos.forEach((episodio) => {
    
    let episodioModel;
    let numero = parseInt((episodio.nome.split(' - '))[0]);

    if(episodio.img !== undefined){
      episodioModel = new EpisodiosModel(episodio.nome, episodio.descricao, episodio.link, `./assets/img/episodios-thumbs/${episodio.img}`)
    }else{
      episodioModel = new EpisodiosModel(episodio.nome, episodio.descricao, episodio.link, `./assets/img/episodios-thumbs/episodio-${zeroEsquerda(2, numero)}.png`);
    }

    episodios.push(episodioModel);
  })

  return episodios;
}

export{
  episodiosController
}