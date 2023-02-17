import { trilhaSonoraConteudo } from "../conteudo/trilhaSonoraConteudo.js";
import { TrilhaSonoraModel } from "../model/trilhaSonoraModel.js";

const trilhaSonoraController = () => {
  const trilhas = new Array();

  trilhaSonoraConteudo.forEach((trilha, index) => {
    trilhas.push(new TrilhaSonoraModel((index + 1), trilha.nome, trilha.link));
  })

  return trilhas;
}

export{
  trilhaSonoraController
}