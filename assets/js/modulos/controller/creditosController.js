import { creditosConteudo } from "../conteudo/creditosConteudo.js";
import { CreditosModel } from "../model/creditosModel.js"

const creditosController = () => {
  const creditos = new Array();
  
  creditosConteudo.forEach(credito => {
    const creditoModel = new CreditosModel(credito.nome, credito.descricao, credito.contato);
    creditos.push(creditoModel);
  })

  return creditos;
}

export{
  creditosController
}