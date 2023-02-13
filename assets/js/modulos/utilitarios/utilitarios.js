function comparaNomes(a, b){
  const primeiro = a.nome.toLowerCase();
  const segundo = b.nome.toLowerCase();

  if(primeiro < segundo){
    return -1;
  }

  if(primeiro > segundo){
    return 1;
  }

  return 0;
}

const isEmpty = (valor) => {
  if(typeof valor == 'string'){
    return valor == undefined || valor == null || valor.length <= 0;
  }else{
    return valor == undefined || valor == null
  }
}

export{
  comparaNomes,
  isEmpty
}