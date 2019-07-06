$(document).ready(() => {
  $.getJSON('/api/todos').then(addTodos);

  $('#todoInput').keypress(event => {
    if (event.which == 13) createTodo();
  });

  $('.list').on('click', 'li', () => updateTodo($(this)));

  $('.list').on('click', 'span', e => {
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

const addTodos = todos => {
  //add todos to page here
  todos.forEach(todo => addTodo(todo));
};

const addTodo = todo => {
  let newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
};

const createTodo = () => {
  //send request to create new todo
  let usrInput = $('#todoInput').val();
  $.post('/api/todos', { name: usrInput })
    .then(newTodo => {
      $('#todoInput').val('');
      addTodo(newTodo);
    })
    .catch(err => console.log(err));
};

const removeTodo = todo => {
  let clickedId = todo.data('id');
  let deleteUrl = `/api/todos/${clickedId}`;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
    .then(data => todo.remove())
    .catch(err => console.log(err));
};

const updateTodo = todo => {
  let clickedId = todo.data('id');
  let updateUrl = `/api/todos/${clickedId}`;
  let isDone = !todo.data('completed');
  let updateData = { completed: isDone };
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
    .then(updatedTodo => {
      todo.toggleClass('done');
      todo.data('completed', isDone);
    })
    .catch(err => console.log(err));
};
