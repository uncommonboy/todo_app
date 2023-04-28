const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const add = document.querySelector(".add");
const select = document.querySelector(".filter_by_status");

//mode changing

const night_btn = document.querySelector(".night_btn");
const day_btn = document.querySelector(".day_btn");
const video = document.querySelector(".video_mp4");

night_btn.addEventListener("click", () => {
  video.src = "pexels-new-zealand-4000470-1620x1080-25fps.mp4";
  night_btn.style.display = "none";
  day_btn.style.display = "block";
});
day_btn.addEventListener("click", () => {
  video.src = "pexels-pixabay-855349-1920x1080-25fps.mp4";
  night_btn.style.display = "block";
  day_btn.style.display = "none";
});
////////////////////////////////////////////////////////

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let status = "all";

////////////////////////////////////

//filter by status
filterTodosByStatus = (todos, status) => {
  switch (status) {
    case "Completed":
      return todos.filter((v) => v.isdone);
    case "proccess":
      return todos.filter((v) => !v.isdone);
    case "all":
      return todos;
  }
};

////////////////

//rendering
const render = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  list.innerHTML = "";
  filterTodosByStatus(todos, status).forEach((element) => {
    const checkbox = element.isdone;
    const disabled = element.disabled;
    list.innerHTML += `
     <li draggable=true class="todo" id="${element.id}">
      <input class='checkbox' 
        ${checkbox == true ? "checked" : ""} 
        onclick="oncheck('${element.id}')"
      type="checkbox"/> 

      <input value="${element.value}"
        ${disabled == false ? "disabled" : ""} 
        class="todo_input ${checkbox ? "check" : ""}" 
       type="text" />


      <div class="edit">
         <i " class="bx bx-sm bxs-pencil"></i>
      </div>

      <div class="save">
        <i " class="bx bx-sm bx-save"></i>
      </div>

      <div class="cancel">
        <i " class="bx bx-sm bx-x"></i>
      </div>
      

          <div class="delete">
              <i " class="bx bx-sm bx-trash"></i>
          </div>
        </li>`;
  });
  //drag and drop

  const source = document.getElementsByClassName("todo");

  let startIndex, dropIndex;

  for (let el of source) {
    el.addEventListener("dragstart", (e) => {
      let id = el.id;
      startIndex = todos.findIndex((el) => el.id == id);
    });
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    el.addEventListener("dragleave", (e) => {
      e.preventDefault();
    });

    el.addEventListener("drop", (e) => {
      let id = el.id;
      dropIndex = todos.findIndex((el) => el.id == id);
      e.preventDefault();
    });

    el.addEventListener("dragend", (e) => {
      let chan = todos.splice(startIndex, 1);
      todos.splice(dropIndex, 0, chan[0]);
      e.preventDefault();
      render();
    });
  }
};

render();

////////////////////////////////////////
const firstTodo = document.querySelector(".block");

firstTodo.addEventListener("click", (e) => {
  const abc = e.target.closest(".todo")?.id;

  if (e.target.closest("[class='clear']")) {
    todos = [];
    render();
  }
  if (e.target.closest(".delete")) {
    todos = todos.filter((v) => v.id != abc);
    render();
  }
  
});

//edit
const onEdit = (id) => {
  let a = getButton(id, "todo_input");

  editButton.style.display = "none";
  saveButton.style.display = "block";
  cancelButton.style.display = "block";
  // debugger;
  a.removeAttribute("disabled");
  // console.log(a);
  console.log(editButton);
  console.log(saveButton.classList);
  // console.log(cancelButton);
  // render();
};

/////////////////////////////////

//closeList
const closeList = (id) => {
  const getButton = (id, className) =>
    document.querySelector(`#${id} .${className}`);
  const editButton = getButton(id, "edit");
  const saveButton = getButton(id, "save");
  const cancelButton = getButton(id, "cancel");
  const a = getButton(id, "todo_input");

  a.disabled = true;
  editButton.style.display = "block";
  saveButton.style.display = "none";
  cancelButton.style.display = "none";
  render();
};

/////////////////////////////

//saveList
const saveList = (id) => {
  const getButton = (id, className) =>
    document.querySelector(`#${id} .${className}`);
  const a = getButton(id, "todo_input");
  const index = todos.findIndex((elInTodos) => elInTodos.id === id);
  todos[index].value = a.value;
  if (todos[index].value == "") {
    alert(" enter your changed version");
    return;
  }
  a.disabled = true;
  const editButton = getButton(id, "edit");
  const saveButton = getButton(id, "save");
  const cancelButton = getButton(id, "cancel");

  editButton.style.display = "block";
  saveButton.style.display = "none";
  cancelButton.style.display = "none";

  render();
};

/////////////////////////

//genereting infos
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target[0].value;
  event.target[0].value = "";
  if (inputValue == "") {
    alert("enter any note");
    return;
  }
  const newTodo = { value: inputValue, id: "a" + Date.now(), disabled: false };
  todos.unshift(newTodo);
  render();
});

//checking
const oncheck = (id) => {
  todos = todos.map((v) => (v.id == id ? { ...v, isdone: !v.isdone } : v));
  render();
};

//delete todo
// const deleteTodo = (id) => {
//   todos = todos.filter((v) => v.id != id);
//   console.log("delete", id, todos);
//   render();
// };

// //clear all
// clear.addEventListener("click", () => {
//   todos = [];
//   render();
// });

//filter by status
select.addEventListener("change", (event) => {
  status = event.target.value;
  render();
  console.log(event);
});
