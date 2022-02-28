var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function fetchTodo1(){
    //GET Request
    fetch('https://jsonplaceholder.typicode.com/todos') // it returns a promise
    .then(function(response){
        // console.log(response); // convert this response into json
        return response.json(); // it also return promise
    })
    .then(function(data){
        // console.log(data);
        tasks = data.slice(0,10);
        renderList();
    })
    .catch(function(error){
        console.log(error);
    })
}

async function fetchTodo(){

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();        
        tasks = data.slice(0,10);
        renderList();
    }
    catch(error)
    {
        console.log(error);
    }

}


function addTaskToDom(task)
{
    var newTask = document.createElement('li');
        var listContent = `<input type="checkbox" id= "${task.id}"  ${task.completed ? 'checked' : '' } data-id="${task.id}" class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="images/trash-can.png" class="delete" data-id="${task.id}" />`;
        newTask.innerHTML = listContent;
        taskList.append(newTask);
}

function handleEventListener(e)
{
    if(e.target.className === 'custom-checkbox')
    {
        toggleTask(e.target.id);
        return;
    }
    else if(e.target.className === 'delete')
    {
        deleteTask(e.target.dataset.id);
    }
}

function renderList () {
    // first we remove all the items are then we will render our new list
    taskList.innerHTML = '';
    for(i=0;i<tasks.length;i++)
    {
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;

    // var deleteButton = document.getElementsByClassName('delete');
    // var markDone = document.getElementsByClassName('custom-checkbox');
    // for(i=0;i<tasks.length;i++)
    // {
    //         deleteButton[i].addEventListener('click',(e)=>{
    //             deleteTask(e.target.dataset.id);
    //         });

    //         markDone[i].addEventListener('click',(e)=> toggleTask(e.target.dataset.id));
    // }

    var listDiv = document.getElementById('list');
    listDiv.addEventListener('click',handleEventListener);
     
}

function toggleTask(taskId) {
    
    for(i=0;i<tasks.length;i++)
    {
        if(tasks[i].id === Number(taskId))
        {
            tasks[i].completed = !tasks[i].completed;
            if(tasks[i].completed)
            showNotification( tasks[i].title  +  " is marked as completed ");
            else
            showNotification( tasks[i].title  +  " is marked as incomplete ")
            renderList();
            return;
        }
    }

   showNotification("Couldn't find the task");
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task) { // creating new array
        return task.id !== Number(taskId); // it will return all the task which are not equal to task we want to delete and stores it in array
    });

    tasks = newTasks;
    
    renderList();
    showNotification('Task Deleted Successfully');
}

function addTask1 (task) {

    if(task)
    {   
        fetch('https://jsonplaceholder.typicode.com/todos',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data),
        }) // it returns a promise
        .then(function(response){
            // console.log(response); // convert this response into json
            return response.json(); // it also return promise
        })
        .then(function(data){
            // console.log(data);
            console.log('Success : ' ,data);
            tasks.push(task);
            renderList();
            showNotification('Task Added Successfully');
        })
        .catch(function(error){
            console.log('Error : ', error);
        })
        
    }

    showNotification("Task can not be added");

   
}

function addTask (task) {

    if(task)
    {
        tasks.push(task);
        renderList();
        showNotification('Task Added Successfully');
        return;
    }

    showNotification("Task can not be added");

   
}

function showNotification(text) {
    // alert(text);
}

function handleInputKeyPress(e) {
    if(e.key == 'Enter')
    {
        const text = e.target.value;
        if(!text)
        {
            // showNotification('Task text can not be empty');
            alert ('Task text can not be empty');
            return;
        }

        const task = {
            title : text, // text
            id: Date.now(),
            completed: false  // false because at the starting task is not completed yet
        }

        e.target.value = ''; // now make it as empty

        addTask(task);
    }
}



function initializeApp()
{   
    fetchTodo();
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
}

initializeApp();