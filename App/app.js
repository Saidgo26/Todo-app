const form = document.querySelector('#form');
const list = document.querySelector('#list');
const inputTask = document.querySelector('#input-task');
const complete = document.querySelector('#complete');
const total = document.querySelector('#total');
const incomplete = document.querySelector('#incomplete');
let tasks = [];

const renderTask = ()=>{
    list.innerHTML= '';
    if(tasks.length === 0){
      const listText = document.createElement('p');
      listText.classList.add('list-text');
      listText.innerHTML = `No hay tareas pendientes`;
      list.append(listText);
      
        total.textContent =`Total:${0}`;
        complete.textContent = `Completas:${0}`;
        incomplete.textContent = `Incompletas:${0}`;
      console.log('no hay tareas pendientes');
      
    }
    tasks.forEach(task =>{
        const listItem = document.createElement('li');
        listItem.classList.add('task');
        listItem.id = task.id;
        listItem.innerHTML = `
        <button class="delete-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
      </svg>
     </button>
      <p>${task.state?
          (`<p class="complete">${task.data}</p>`):(`<p>${task.data}</p>`)}</p>
          <button class="check-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        </button>
        `;
        list.append(listItem);

        //contadores
        let totalTasks = tasks.length;
        total.textContent =`Total:${totalTasks}`;
        let taskComplete = tasks.filter(task=> task.state === true).length;
        complete.textContent = `Completas:${taskComplete}`;
        let taskIncomplete = tasks.filter(task=> task.state === false).length;
        incomplete.textContent = `Incompletas:${taskIncomplete}`;
        localStorage.setItem('tareas', JSON.stringify(tasks));

    });

};
form.addEventListener('submit', e =>{
    e.preventDefault();
    const task = inputTask.value;
    const taskCopy = tasks;
    const taskContacsCopy = taskCopy.sort((a,b) =>
  b.id - a.id)
    if (task.length < 1){
        console.log('vacio');
        inputTask.classList.add('invalid');
        return;
    }
    const newTask ={
            data: task,
            state: false,
            id: taskCopy.length ? taskContacsCopy[0].id + 1: 0,
        }
        tasks = tasks.concat(newTask);
        localStorage.setItem('tareas', JSON.stringify(tasks));
        inputTask.value = '';
        inputTask.classList.remove('invalid');
        renderTask();
});

list.addEventListener('click', e =>{ 
    const deleteBtn = e.target.closest('.delete-btn');
    const checkBtn = e.target.closest('.check-btn');
 
  if(deleteBtn){
    const taskToDelete = deleteBtn.parentElement;
    const id = Number(taskToDelete.id);
    tasks = tasks.filter(task => task.id!== id);
    localStorage.setItem('tareas', JSON.stringify(tasks));
    renderTask();
  };

  if (checkBtn) {
    const checkTasks = checkBtn.parentElement;
    const id = Number(checkTasks.id);
    const taskToChechk = tasks.map(task => {
        if (task.id === id) {
            task.state = !task.state;
            return task;
        } else {
            return task;
        }
    })
    tasks = taskToChechk;
    renderTask();
  };
});

(() => {
  const taskStorage = localStorage.getItem('tareas') || [];
    tasks = JSON.parse(taskStorage)
    renderTask();
  })();

 




