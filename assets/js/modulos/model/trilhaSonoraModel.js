export class TrilhaSonoraModel {
  constructor(id, nome, link){
    this.id = id;
    this.nome = nome;
    this.link = link;
  }

  getId(){
    return this.id;
  }

  getNome(){
    return this.nome;
  }

  getLink(){
    return this.link;
  }
}