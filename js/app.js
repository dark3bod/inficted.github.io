// P�gina come�a sem todos
var secaoPrincipal = $('#main');
var rodape = $('#rodape');
var btnLimparCompletos = $('#clear-completed');
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
    secaoPrincipal.show();
    rodape.show();
    $('#todo-list').append("<li><div class='view'><input class='toggle' type='checkbox'><label class='campoTodo'>" + nomeAtividadeNova + "</label><button class='destroy'></button></div><input class='edit' value='Editando a ativadade'></li>");
    attQuantidadeItens();
}

function attQuantidadeItens() {
    let quantidade = getAllTodos().length - getTodosCompletos().length;
    if (quantidade != 1) {
        //$('#todo-count').html("<strong> itens restantes</strong>");
    } else {
       // $('#todo-count').text(" item restante");
    }
    $('#quantidade-itens').text(quantidade);
}

function attBtnLimparCompletos(){
  if ($('#main > ul li.completed').length > 0) {
    btnLimparCompletos.show();
  } else {
    btnLimparCompletos.hide();
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
});

// Aperta o bot�o de excluir o todo
$(document).on('click', '.destroy', function () {
    $(this).parent().parent().remove();
    attQuantidadeItens();
});

$(document).on('click', '#clear-completed', function(){
  let arrTodosCompletos = getTodosCompletos();
  $(arrTodosCompletos).remove();
  btnLimparCompletos.hide();
})
