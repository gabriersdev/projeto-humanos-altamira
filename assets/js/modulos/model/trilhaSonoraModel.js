export class TrilhaSonoraModel {
  constructor(nome, link){
    this.nome = nome;
    this.link = link;
  }

  getNome(){
    return this.nome;
  }

  getLink(){
    return this.link;
  }
}