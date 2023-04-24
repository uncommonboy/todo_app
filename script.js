const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const add = document.querySelector(".add");
const edit = document.querySelector("#edit");
let todos = [{value:`reading books ${checkbox=true  }`, value:'playing football'}];

const render = () => {
  list.innerHTML = "";
  for (let element of todos) {
    list.innerHTML += ` <li class="todo">
    <input class='checkbox'  ${checkbox == true ? "checked" : ""} onclick="oncheck('${element.id}')" type="checkbox"/> 

      <input disabled="disabled" value="${
        element.value
      }" class="todo_input" type="text" />
    <div class="edit">
    <i id='edit' class="bx bx-sm bxs-pencil"></i>
        </div>
        <div class="delete">
        <i onclick="deleteTodo('${element.id}')" class="bx bx-sm bx-trash"></i>
        </div>
        </li>`;
  }
};
render();
const deleteTodo = (id) => {
  todos = todos.filter((v) => v.id != id);
  render();
  console.log("delete", id, todos);
};
const oncheck = (id) => {
  todos = todos.map((v) => (v.id == id ? { ...v, isdone: !isdone } : v));
  render();
  console.log("check", todos);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target[0].value;
  const newTodo = { value: inputValue, id: Date.now() + "#" };
  todos.unshift(newTodo);
  render();
});

clear.addEventListener("click", () => {
  todos = [];
  render();
});

// add.addEventListener("click", () => {
//   const inp = document.querySelector(".input");
//   inp.value = "";
//   render()
// });
// edit.addEventListener("click", () => {
//   const todo_inp = querySelector(".todo_input");
//   todo_inp.removeAttr();
//   console.log(todo_inp);
// });
