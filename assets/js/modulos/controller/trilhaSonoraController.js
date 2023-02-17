import { trilhaSonoraConteudo } from "../conteudo/trilhaSonoraConteudo.js";
import { TrilhaSonoraModel } from "../model/trilhaSonoraModel.js";

const trilhaSonoraController = () => {
  const trilhas = new Array();

  trilhaSonoraConteudo.forEach(trilha => {
    trilhas.push(new TrilhaSonoraModel(trilha.nome, trilha.link));
  })

  return trilhas;
}

export{
  trilhaSonoraController
}