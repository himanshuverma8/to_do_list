document.addEventListener("DOMContentLoaded",()=>{
    const addTaskbutton=document.getElementById("add-task-btn");
const inputBox=document.getElementById("todo-input");
const listBox=document.getElementById("todo-list");
let tasks= JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task)=>{
    renderTask(task);
})
addTaskbutton.addEventListener('click',()=>{
    const taskText=inputBox.value.trim();
    if(!taskText.length) return;
    const newTask={
        id: Date.now(),
        text: taskText,
        completed: false
    }
    tasks.push(newTask);
    renderTask(newTask);
    saveTasks();
    inputBox.value="";
    console.log(tasks)
})
function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function renderTask(task){
    const li=document.createElement('li');
    li.setAttribute("data-id",task.id);
    li.innerHTML=`<span>${task.text}</span> <button>delete</button>`;
    listBox.appendChild(li);
    if(task.completed){
        li.classList.add('underline');
    }else{
        li.classList.remove('underline');
    }
    li.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON') return
       task.completed=!task.completed;
       li.classList.toggle("underline");
        saveTasks();
    })
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation();
        tasks=tasks.filter(t=>t.id!==task.id);
        li.remove();
        saveTasks();
    })
}
})