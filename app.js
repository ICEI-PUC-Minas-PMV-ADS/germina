/* Menu + rodapé em um só lugar: para mudar o menu, edite só aqui. */
(function () {
  var links = [
    ['Sobre nós', 'sobre.html'],
    ['Produtos', 'produtos.html'],
    ['Sementes', 'sementes.html'],
    ['Cultive', 'cultive.html'],
    ['Fale com especialista', 'especialista.html'],
  ];
  var atual = location.pathname.split('/').pop() || 'login.html';

  var nav = links.map(function (l) {
    var ativo = l[1] === atual ? ' class="ativo" aria-current="page"' : '';
    return '<a href="' + l[1] + '"' + ativo + '>' + l[0] + '</a>';
  }).join('');

  document.body.insertAdjacentHTML('afterbegin',
    '<header class="menu">' +
      '<a href="index.html" class="logo" aria-label="Germina - tela inicial">' +
        '<img src="logogermina.svg" alt="Germina"></a>' +
      '<nav>' + nav + '</nav>' +
    '</header>');
  document.body.insertAdjacentHTML('beforeend', '<footer class="rodape"></footer>');

  /* ----- LOGIN ----- */
  var btnEntrar = document.getElementById('btn-entrar');
  if (btnEntrar) {
    btnEntrar.addEventListener('click', function () {
      window.location.href = 'index.html'; // <- tela feita pela outra pessoa
    });
  }

  /* ----- CADASTRO ----- */
  var formCadastro = document.getElementById('form-cadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('mensagem');
      var senha = document.getElementById('senha');
      var conf = document.getElementById('confirmar-senha');
      if (senha.value !== conf.value) {
        msg.textContent = 'As senhas não são iguais. Digite novamente.';
        conf.focus();
        return;
      }
      msg.textContent = '';
      window.location.href = 'login.html';
    });
  }

  /* ----- REDEFINIR SENHA ----- */
  var formRedef = document.getElementById('form-redefinicao');
  if (formRedef) {
    formRedef.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('email');
      document.getElementById('mensagem').textContent =
        'Pronto! Se o e-mail ' + email.value + ' estiver cadastrado, você receberá uma nova senha.';
      formRedef.reset();
    });
  }
})();
