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
  }
})();