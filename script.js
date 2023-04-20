const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const add = document.querySelector(".add");
const edit = document.querySelector("#edit");
console.log(form);
const todos = [];

const render = () => {
  list.innerHTML = "";
  for (let element of todos) {
    list.innerHTML += ` <li class="todo">
    <input class='checkbox'  type="checkbox">
    <input disabled="disabled" value="${element.value}" class="todo_input" type="text" />
    <div class="edit">
    <i id='edit' class="bx bx-sm bxs-pencil"></i>
        </div>
        <div class="delete">
        <i class="bx bx-sm bx-trash"></i>
        </div>
        </li>`;
  }
};
render();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target[0].value;
  const newTodo = { value: inputValue, id: Date.now() + "#" };
  todos.unshift(newTodo);
  render();
});

clear.addEventListener("click", () => {
  list.innerHTML = [];
});

edit.addEventListener("click", () => {
  const todo_inp = querySelector(".todo_input");
  todo_inp.removeAttr("disabled");
  console.log("salom");
});

// add.addEventListener("click", () => {
//   const inp = document.querySelector(".input");
//   inp.value = "";
// });
