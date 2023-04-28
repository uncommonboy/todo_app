const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const add = document.querySelector(".add");
const select = document.querySelector(".filter_by_status");
const night_btn = document.querySelector(".night_btn");
const day_btn = document.querySelector(".day_btn");
const video = document.querySelector(".video_mp4");

//mode changing
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
const firstTodo = document.querySelector(".container");
firstTodo.addEventListener("click", (e) => {
  ///buttonlarni chaqirish
  const abc = e.target.closest(".todo")?.id;
  const getButton = (abc, className) =>
    document.querySelector(`#${abc} .${className}`);
  const editButton = getButton(abc, "edit");
  const saveButton = getButton(abc, "save");
  const cancelButton = getButton(abc, "cancel");
  const a = getButton(abc, "todo_input");

  //clear
  if (e.target.closest("[class='clear']")) {
    todos = [];
    render();
  }

  //delete
  if (e.target.closest(".delete")) {
    todos = todos.filter((v) => v.id != abc);
    render();
  }

  //edit
  if (e.target.closest(".edit")) {
    editButton.style.display = "none";
    saveButton.style.display = "block";
    cancelButton.style.display = "block";
    a.removeAttribute("disabled");
    console.log(editButton);
  }

  //save
  if (e.target.closest(".save")) {
    const index = todos.findIndex((elInTodos) => elInTodos.id === abc);
    todos[index].value = a.value;
    if (todos[index].value == "") {
      alert(" enter your changed version");
      return;
    }
    editButton.style.display = "block";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    a.disabled = true;
    render();
  }

  //closeList
  if (e.target.closest(".cancel")) {
    a.disabled = true;
    editButton.style.display = "block";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    render();
  }

  //checking
  if (e.target.closest(".checkbox")) {
    todos = todos.map((v) => (v.id == abc ? { ...v, isdone: !v.isdone } : v));
    render();
  }
});

///////////genereting infos///////////
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

//filter by status
select.addEventListener("change", (event) => {
  status = event.target.value;
  render();
});
