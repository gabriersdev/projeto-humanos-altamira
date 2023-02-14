export class EpisodiosModel{
  constructor(nome, descricao, link, img){
    this.nome = nome;
    this.descricao = descricao;
    this.link = link;
    this.img = img;
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

  getImg(){
    return this.img;
  }

  setWiki(wiki){
    this.wiki = wiki;
  }

  getWiki(){
    return this.wiki;
  }
}