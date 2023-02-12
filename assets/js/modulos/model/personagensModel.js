export class PersonagemModel{
  constructor(nome, descricao, link){
    this.nome = nome;
    this.descricao = descricao;
    this.link = link;
  }

  getNome(){
    return this.nome;
  }

  getDescricao(){
    return this.descricao;
  }

  getLink(){
    return this.link;
  }
}