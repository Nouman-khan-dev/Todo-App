let modeBtn = document.querySelector(".colorMode");
const main = document.getElementById("main");
const itemInput = document.querySelector(".item-input");
const container = document.querySelector(".container");
const todoContainer = document.querySelector(".items-container");
let input = document = document.getElementById("input");
const contBtns = document.querySelectorAll('.b-btn');
const completeBtn = document.querySelector(".completed")
const activeBtn = document.querySelector(".activeTodo")
const allBtn = document.querySelector(".allTodo")
const clearBtn = document.querySelector('.btn-clear');


let form = document.querySelector("#form");



// ---------dark_mode-and-Light_mode----------

modeBtn.addEventListener("click", (e) => {
    if (!modeBtn.classList.contains("light")) {
        modeBtn.src = "images/icon-moon.svg";
        modeBtn.classList.add("light")
        main.classList.add("light");
        container.classList.add("light")
    }
    else {
        modeBtn.src = "images/icon-sun.svg";
        modeBtn.classList.remove('light')
        main.classList.remove("light")
        container.classList.remove("light")
    }
});


// ----create-a-new-todo---
form.addEventListener("submit", (e) => {
    let h3 = document.querySelector('h3')
    e.preventDefault();
    if (h3) {
        todoContainer.innerHTML = ""
 }
    creatNewTodo();
    leftTodos()
 dragAndDrop()

})
// left---todos-
function leftTodos() {
    checkBox = document.querySelectorAll(".checkBox")
    // console.log(active.length)
    // if()
    let active = document.querySelectorAll(".checkBox.active");
    document.querySelector(".left-todo").innerHTML =
        checkBox.length - active.length;
    ulStorage();
}

let todos = JSON.parse(localStorage.getItem("todos"))
if (todos) {
    todos.forEach(element => {
        creatNewTodo(element);
        document.querySelector(".left-todo").innerText = element.leftedTodos;
        // console.log(element.leftedTodos)
    });
}
let items = document.querySelectorAll(".item")
if (items.length == 0) {
    todoContainer.innerHTML = `<h3>List is empty
            <div class="line"></div></h3>`;
}
function creatNewTodo(elem) {

    let text = input.value;
    let todoItem = document.createElement("div");
    if (elem) {
        text = elem.text;
    }
    todoItem.draggable = true;

    todoItem.classList.add("item");
    todoItem.innerHTML =
        `<div class="line"></div>
    <div class="checkBox ${elem && elem.complete ? "active" : ""}"></div>
    <p class="todoText ${elem && elem.complete ? "active" : ""}">${text}</p>
    <img src="images/icon-cross.svg" class="cross-icon" alt="">`;
   if (text != "") {
        todoContainer.prepend(todoItem);
        input.value = ''
    }
    checkTheBox()
    ulStorage()

    // ---------------for-deldete-icon----

    const deldeteIcon = document.querySelectorAll(".cross-icon");
    deldeteIcon.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.target.parentElement.remove();
            leftTodos()
            ulStorage();
            let items = document.querySelectorAll(".item")
            if (items.length == 0) {
                todoContainer.innerHTML = `<h3>List is empty
            <div class="line"></div></h3>`;
            }
        })
    });
}

function checkTheBox() {
    const checkBox = document.querySelectorAll(".checkBox");
    checkBox.forEach((element) => {
        element.addEventListener("click", (box) => {
            leftTodos();
            box.target.classList.add("active")
            element.nextElementSibling.classList.add("active")
            // .style.textDecoration = "line-through";
            ulStorage();
        })
    })
}

checkTheBox()

contBtns.forEach(eleme => {
    eleme.addEventListener("click", (e) => {
        document.querySelector("p.b-btn.active").
            classList.remove("active");
        eleme.classList.add("active");
    })
});


// completed todo show----

completeBtn.addEventListener("click", () => {

    document.querySelectorAll(".checkBox").forEach(e => {
        if (!e.classList.contains('active')) {
            e.parentElement.style.display = "none";
        }
        else {
            e.parentElement.style.display = "flex";
         }
        // console.log(e.parentElement.length)

    })
})

// for active todos-----

activeBtn.addEventListener("click", () => {
    let checkBox = document.querySelectorAll(".checkBox")
    checkBox.forEach(e => {
        if (e.classList.contains('active')) {
            e.parentElement.style.display = "none";
        }
        else {
            e.parentElement.style.display = "flex";
        }
    })
})

// for all todos-----

allBtn.addEventListener("click", () => {
    document.querySelectorAll(".checkBox").forEach(e => {
        if (e.classList.contains('active')) {
            e.parentElement.style.display = "flex"
        } else {
            e.parentElement.style.display = "flex"
        }
    })
})

// for clear conpleted ---

clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".checkBox").forEach(e => {
        if (e.classList.contains('active')) {
            e.parentElement.remove();
            ulStorage();
        } else { }
        let items = document.querySelectorAll(".item")
        if (items.length == 0) {
            todoContainer.innerHTML = `<h3>List is empty
            <div class="line"></div></h3>`;
        }
    })
})
// -------------for update storage--
function ulStorage() {
    let todoText = document.querySelectorAll(".todoText");
    let arry = [];
    todoText.forEach(elem => {
        arry.push({
            text: elem.innerText,
            complete: elem.classList.contains("active"),
            leftedTodos: document.querySelector(".left-todo").innerText
        })
    })
    localStorage.setItem("todos", JSON.stringify(arry))
}

// for drag and drop --------------

function dragAndDrop(){
const todoItem = document.querySelectorAll(".item")
    todoItem.forEach(item => {
        item.addEventListener("dragstart",()=>{
            setTimeout(() => {
                item.classList.add("dragging");}, 0);
        })
        item.addEventListener("dragend",()=> item.classList.remove("dragging"))
    });

    function initSortableList  (e){
        e.preventDefault();
        const draggingItem = todoContainer.querySelector(".dragging")
        const siblings = [...todoContainer.querySelectorAll(".item:not(.dragging)")];
        let nextSibling = siblings.find(sibling =>{
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 0.7;
        })
        todoContainer.insertBefore(draggingItem , nextSibling );
    
    }
    todoContainer.addEventListener("dragover", initSortableList)
    todoContainer.addEventListener("dragenter", e => e.preventDefault())

}
 dragAndDrop()
