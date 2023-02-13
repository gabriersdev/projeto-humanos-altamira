import { personagensConteudo } from "../conteudo/personagensConteudo.js";
import { PersonagemModel } from "../model/personagensModel.js";

const personagensController = () => {
  const personagens = new Array();

  personagensConteudo.forEach(personagem => {
    const personagemModel = new PersonagemModel(personagem.nome.trim(), personagem.descricao.trim(), personagem.link.trim());
    personagens.push(personagemModel);
  })

  return personagens;
}

export {
  personagensController
};