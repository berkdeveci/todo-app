const form = document.querySelector("#todo-form");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const todoInput = document.querySelector("#todo");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodos);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}
function loadAllTodos(){
    let todos = getTodosStorage();
    todos.forEach((todo)=>{
        addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    todoInput.value = "";    
    let todos = getTodosStorage();
    let text = todos[todos.indexOf(newTodo)];
    if(newTodo === ""){
        showAlert("danger", "Boş Todo girilemez!");
    }else if(newTodo == text){
        showAlert("danger", "Aynısından zaten eklemişsin");
    }else{
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success", "Başarıyla eklendi..")
    }
    e.preventDefault();
}
function showAlert(status, message){
   const addAlert = document.createElement("div");
   addAlert.className = `alert alert-${status}`;
   addAlert.setAttribute("role", "alert");
   addAlert.textContent = message;
   firstCardBody.appendChild(addAlert);

   setTimeout(() => {
    addAlert.remove();
   }, 800);

}
function addTodoToUI(newTodo){
 const listItem = document.createElement("li");
 const link = document.createElement("a");
 link.href = "#";
 link.className = "delete-item";
 link.innerHTML = "<i class='fa fa-remove'></i>";

 listItem.className = "list-group-item d-flex justify-content-between";
 listItem.appendChild(document.createTextNode(newTodo));
 listItem.appendChild(link);
 todoList.appendChild(listItem);
}
function getTodosStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoStorage(newTodo){
    let todos = getTodosStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e){
    if(e.target.className == "delete-item" || e.target.className == "fa fa-remove"){
       e.target.parentElement.parentElement.remove();
       deleteTodoStorage(e.target.parentElement.parentElement.textContent);
       showAlert("success", "Başarıyla silindi..");
    }else{
        //
    }
}
function deleteTodoStorage(deletetodo){
    let todos = getTodosStorage();
    todos.forEach((todo, index)=>{
        if(todo === deletetodo){
            todos.splice(index, 1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach((listItems)=>{
        const textItem = listItems.textContent.toLowerCase();
        if(textItem.indexOf(filterValue) === -1){
            listItems.setAttribute("style", "display:none!important");
            listItems.firstElementChild.firstElementChild.setAttribute("style", "float:right")
        }else{
            listItems.setAttribute("style", "display:block!important");
            listItems.firstElementChild.firstElementChild.setAttribute("style", "float:right")
        }
    })
}
function clearAllTodos(e){
    if(confirm("Hepsini sileceksiniz, onaylıyor musun?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos")
        showAlert("success", "Hepsi silindi!")
    }
}