(() => {
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });

  document.querySelectorAll('input').forEach(input => {

    input.parentElement.querySelector('button[type=submit]').addEventListener('click', (evento) => {

      input.setCustomValidity('');
      evento.preventDefault();

      if(input.validity.valueMissing){
        $(input).tooltip('show');
        input.focus();
      }
    })
  });

  window.onload = () => {
    const dataAtual = new Date();

    document.querySelectorAll("[data-ano-atual]").forEach(area => {
      area.textContent = `${dataAtual.getFullYear()}`;
    })

    document.querySelectorAll('[data-link]').forEach(link => {
      switch(link.dataset.link){
        case "site-oficial":
          link.href = 'https://www.projetohumanos.com.br';
          break;
        case "comunidade-reddit":
          link.href = 'https://www.reddit.com/r/ProjetoHumanos/';
          break;
        case "ivan-mizanzuk":
          link.href = 'https://mizanzuk.com';
          break;
      }
    })

    const sortearEmbed = () => {
      const sorteio = Math.floor(Math.random() * 2);
      const embeds = document.querySelectorAll('[data-embed]');
      const recomendacao = document.querySelector('.recomendacao__conteudo');

      if(sorteio == 0){
        
        if(embeds[0] !== null){
          embeds[0].style.display = 'block';
          embeds[1].style.display = 'none';
          recomendacao.classList.value = 'recomendacao__conteudo';
        }

      }else{

        if(embeds[1] !== null){
          embeds[1].style.display = 'block';
          embeds[0].style.display = 'none';
          recomendacao.classList.value = 'recomendacao__conteudo embed-deezer';
        }

      }
    }

    sortearEmbed();
  }
})();