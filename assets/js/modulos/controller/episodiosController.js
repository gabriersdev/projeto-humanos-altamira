import { EpisodiosModel } from "../model/episodiosModel.js";
import { episodiosConteudos } from "../conteudo/episodiosConteudo.js";
import { isEmpty, zeroEsquerda } from "../utilitarios/utilitarios.js";

const episodiosController = () => {
  const episodios = new Array();

  episodiosConteudos.forEach((episodio, index) => {
    
    let episodioModel;

    if(!isEmpty(episodio.img)){
      episodioModel = new EpisodiosModel(episodio.nome, episodio.descricao, episodio.link, `./assets/img/episodios-thumbs/${episodio.img}`)
    }else{
      episodioModel = new EpisodiosModel(episodio.nome, episodio.descricao, episodio.link, `./assets/img/episodios-thumbs/episodio-${zeroEsquerda(2, index + 1)}.png`);
    }

    episodios.push(episodioModel);
  })

  return episodios;
}

export{
  episodiosController
}