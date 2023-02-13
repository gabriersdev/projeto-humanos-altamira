import { creditosConteudo } from "../conteudo/creditosConteudo.js";
import { CreditosModel } from "../model/creditosModel.js"

const creditosController = () => {
  const creditos = new Array();
  
  creditosConteudo.forEach(credito => {
    const creditoModel = new CreditosModel(credito.nome.trim(), credito.descricao.trim(), credito.contato.trim());
    creditos.push(creditoModel);
  })

  return creditos;
}

export{
  creditosController
}