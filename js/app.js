// P�gina come�a sem todos
const secaoPrincipal = $('#main');
const btnLimparCompletos = $('#clear-completed');
const campoToggleAll = $('#toggle-all');
secaoPrincipal.hide();
btnLimparCompletos.hide();

$(document).on('keyup', '#new-todo, .edit', function (e) {
    // Verifica se a tecla pressionada foi ENTER
    if (e.keyCode == 13) {
        validaInput(e.target.value.trim(), this);
    }
    // Verifica se a tecla pressionada durante a edição foi o ESC
    else if (e.keyCode == 27 && $(this).hasClass('edit')) {
        $(this).parent().removeClass('editing');
    }
});

function validaInput(nomeDoTodo, elementoDoInput) {
    if (nomeDoTodo.length > 0) {
        $(elementoDoInput).val('');
        $(elementoDoInput).hasClass('edit') ? editaTodo(nomeDoTodo, elementoDoInput) : criaTodo(nomeDoTodo);
    }
}

function criaTodo(nomeAtividadeNova) {
    secaoPrincipal.fadeIn(700);
    $("<li><div class='view'><input class='toggle' type='checkbox'><label class='campoTodo'>" 
      + nomeAtividadeNova 
      + "</label><button class='destroy'></button></div><input class='edit' value='Editando a ativadade'></li>")
      .hide()
      .appendTo('#todo-list')
      .slideDown(250);

    attQuantidadeItens();
}

function attQuantidadeItens() {
    let quantidade = getAllTodos().length - getTodosCompletos().length;
    let areaItensRestantes = $('#todo-count');
    if (quantidade != 1) {
      areaItensRestantes.empty().html("<b>" + quantidade + "</b> items left");
    } else {
       areaItensRestantes.empty().html("<b>" + quantidade + "</b> item left");
    }
}

function attBtnLimparCompletos(){
  if ($('#main > ul li.completed').length > 0) {
    btnLimparCompletos.fadeIn(500);
  } else {
    btnLimparCompletos.fadeOut(500);
  }
}

function attBtnToggleAllCompleted(){
  let quantidadeTodosCompletos = getTodosCompletos().length;
  let quantidadetTotalTodos = getAllTodos().length;
  if (quantidadetTotalTodos == quantidadeTodosCompletos && quantidadeTodosCompletos > 0){
    campoToggleAll.prop('checked', 'false');
  } else {
    campoToggleAll.removeAttr('checked');
  }
}

function editaTodo(nomeNovoDaAtividade, campo) {
    let listItemPai = $(campo).parent();
    $(listItemPai).removeClass('editing');
    $(listItemPai).find('.campoTodo').text(nomeNovoDaAtividade);
}

function getTodosCompletos(){
  return $('#main > ul li.completed');
}

function getAllTodos(){
  return $('#main > ul li');
}

function getTodosAtivos(){
  return $('#main > ul li:not(.completed)');
}

// Bot�o para marcar todos ou tirar a marca��o de todos
$('#toggle-all').on('click', function (e) {
    let arrTodosCompletos = getAllTodos();
    let camposSelecionaveis = $('#todo-list').find('.toggle');
    // Poderia usar o this ao invés do e.target também!!
    if($(e.target).is(':checked')){
      camposSelecionaveis.prop('checked', 'false');
      $(arrTodosCompletos).addClass('completed');
    } else {
      camposSelecionaveis.removeAttr('checked');
      $(arrTodosCompletos).removeClass('completed');
    }
    attQuantidadeItens();
    attBtnLimparCompletos();
});

// Double click para editar o todo
$(document).on('dblclick', '.campoTodo', function (e) {
    let listItemPai = $(this).parent().parent();
    let inputEdicao = listItemPai.children('.edit');
    listItemPai.addClass('editing');
    inputEdicao.val(this.innerText);
    inputEdicao.focus();
});

// Aperta o bot�o de todo completo
$(document).on('click', '.toggle', function () {
    $(this).parent().parent().toggleClass('completed');
    attQuantidadeItens();
    attBtnLimparCompletos();
    attBtnToggleAllCompleted();
});

// Aperta o bot�o de excluir o todo
$(document).on('click', '.destroy', function () {
    let todo = $(this).parent().parent();
    $(todo).slideUp( 350, function() {
      $(todo).remove();
      attQuantidadeItens();
    });
});

// Aperta o botão de excluir os todos completos
$(document).on('click', '#clear-completed', function(){
  let arrTodosCompletos = getTodosCompletos();
  $(arrTodosCompletos).slideUp( 350, function() {
      $(arrTodosCompletos).remove();
      attQuantidadeItens();
    });

  $('#toggle-all').removeAttr('checked');
  btnLimparCompletos.hide();
});

$(document).on('click', '#show-all, #show-only-completed, #show-only-active', function(){
  $('#filters').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  let arrTodosAtivos = getTodosAtivos();
  let arrTodosCompletos = getTodosCompletos();

  if ( $(this).is('#show-all')) {
    $(arrTodosCompletos).slideDown(400);
    $(arrTodosAtivos).slideDown(400);
    attBtnToggleAllCompleted();
    attBtnLimparCompletos();
  }
  else if ($(this).is('#show-only-completed')){
    $(arrTodosAtivos).slideUp(350);
    $(arrTodosCompletos).slideDown(400);
    attBtnLimparCompletos();
    campoToggleAll.prop('checked', 'true');
  }
  else {
    $(arrTodosCompletos).slideUp(350);
    $(arrTodosAtivos).slideDown(400);
    btnLimparCompletos.fadeOut(500);
    campoToggleAll.removeAttr('checked');
  }
});
