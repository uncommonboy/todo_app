const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const add = document.querySelector(".add");
const select=document.querySelector('.filter_by_status')
console.log(select);
let todos = [
  { value: `reading books`, isdone: true ,id:1},
  { value: "playing football", isdone: false,id:2 },
];
let status='all'

filterTodosByStatus=(status,todos)=>{
  switch(status){
    case 'Completed':
      return todos.filter((v)=>v.isdone);
      case 'proccess':
        return todos.filter((v)=> !v.isdone);
        case "all":
          return todos
    }
}

const render = () => {
  list.innerHTML = "";
  filterTodosByStatus(status,todos).forEach((element)=>{
    const checkbox = element.isdone;
    console.log(checkbox);
    list.innerHTML += ` <li class="todo">
    <input class='checkbox'  ${
      checkbox == true ? "checked" : ""
    } onclick="oncheck('${element.id}')" type="checkbox"/> 

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
  })
  // for (let element of todos) {
   
  // }
};
render();

//genereting
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target[0].value;
  event.target[0].value = ""
    if(inputValue == ""){
        alert("enter any note")
        return
    }
  const newTodo = { value: inputValue, id: Date.now() + "#" };
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
select.addEventListener('change',(event)=>{
  status=event.target.value
  render()
})
