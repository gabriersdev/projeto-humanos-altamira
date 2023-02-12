export class CreditoModel{
  constructor(nome, descricao, contato){
    this.nome = nome,
    this.descricao = descricao,
    this.contato = contato
  }

  getNome(){
    return this.nome;
  }

  getDescricao(){
    return this.descricao;
  }

  getContato(){
    return this.contato;
  }
}