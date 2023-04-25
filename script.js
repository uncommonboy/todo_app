const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const add = document.querySelector(".add");
const select = document.querySelector(".filter_by_status");
console.log(select);
let todos = [
  { value: `reading books`, isdone: true, id: "a1" },
  { value: "playing football", isdone: false, id: "a2" },
];
let status = "all";

filterTodosByStatus = (status, todos) => {
  switch (status) {
    case "Completed":
      return todos.filter((v) => v.isdone);
    case "proccess":
      return todos.filter((v) => !v.isdone);
    case "all":
      return todos;
  }
};

const render = () => {
  list.innerHTML = "";
  filterTodosByStatus(status, todos).forEach((element) => {
    const checkbox = element.isdone;
    list.innerHTML += ` <li class="todo">
    <input class='checkbox'  ${
      checkbox == true ? "checked" : ""
    } onclick="oncheck('${element.id}')" type="checkbox"/> 

      <input disabled="disabled" value="${
        element.value
      }" class="todo_input" type="text" />

      <div class="edit">
       <i onclick="onEdit('${
         element.id
       }')" id='edit'  class="bx bx-sm bxs-pencil"></i>
      </div>
          <div class="save">
            <i onclick="saveList("${element.id}")"  class='bx bx-sm bx-save'></i>
          </div>

          <div class="cancel">
            <i onclick="closeList('${element.id}')"  class='bx bx-sm bx-x' ></i>
          </div>
      

          <div class="delete">
              <i onclick="deleteTodo('${
                element.id
              }')" class="bx bx-sm bx-trash"></i>
          </div>
        </li>`;
  });
};
render();

const onEdit = (id) => {
  const getButton = (id, className) =>
    document.querySelector(`#${id} .${className}`);
  const editBtn = getButton(id, "edit");
  const saveBtn = getButton(id, "save");
  const cancelBtn = getButton(id, "cancel");


  cancelBtn.style.display = "block";
  saveBtn.style.display = "block";
  editBtn.style.display = "none";
};

//genereting
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target[0].value;
  event.target[0].value = "";
  if (inputValue == "") {
    alert("enter any note");
    return;
  }
  const newTodo = { value: inputValue, id: "a" + Date.now() };
  todos.unshift(newTodo);
  render();
});
//checking
const oncheck = (id) => {
  todos = todos.map((v) => (v.id == id ? { ...v, isdone: !v.isdone } : v));
  render();
  console.log("check", todos);
};

//delete todo
const deleteTodo = (id) => {
  todos = todos.filter((v) => v.id != id);
  render();
  console.log("delete", id, todos);
};

//clear all
clear.addEventListener("click", () => {
  todos = [];
  render();
});

//filter by status
select.addEventListener("change", (event) => {
  status = event.target.value;
  render();
});
