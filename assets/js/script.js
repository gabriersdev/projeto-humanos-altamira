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


})();