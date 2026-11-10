const btnAdicionar = document.getElementById('btnAdicionar');
const btnRetirar = document.getElementById('btnRetirar');
  const formulario = document.getElementById('formulario');
  const btnCancelar = document.getElementById('btnCancelar');

  btnAdicionar.addEventListener('click', () => {
    formulario.classList.toggle('escondido');
  });

  btnRetirar.addEventListener('click', () => {
    formulario.classList.toggle('escondido');
  });
  
  btnCancelar.addEventListener('click', () => {
    formulario.classList.add('escondido');
  });


