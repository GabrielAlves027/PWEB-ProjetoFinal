const $modal = document.getElementById('modal');
const $titleInput = document.getElementById('title');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $termInput = document.getElementById('term');
const $idInput = document.getElementById('idInput');
const $columnInput = document.getElementById('column');
const $responsibleInput = document.getElementById('responsible');



const $createTask = document.getElementById('createTask');
const $editTask = document.getElementById('editTask');

const $createBtn = document.getElementById('createBtn');
const $editBtn = document.getElementById('editBtn');

var tasks = localStorage.getItem("tasks");
var taskList = tasks ? JSON.parse(tasks) : [];

createCards();

function openModal(data_column){
    $modal.style.display = "flex";

    $columnInput.value = data_column;

    $createTask.style.display = "block";
    $createBtn.style.display = "block";
    $editTask.style.display = "none";
    $editBtn.style.display = "none";

    $priorityInput.innerHTML = `<select id="priority">
                                    <option selected>Baixa</option>
                                    <option>Média</option>
                                    <option>Alta</option>
                                </select>`;

    if(data_column === 1){
        $columnInput.innerHTML = `<select id="column" disabled="disabled">
                                    <option value="1" selected>A Fazer</option>
                                    <option value="2">Em Andamento</option>
                                    <option value="3">Concluído</option>
                                </select>`;
    } else if(data_column === 2){
        $columnInput.innerHTML = `<select id="column" disabled="disabled">
                                    <option value="1">A Fazer</option>
                                    <option value="2" selected>Em Andamento</option>
                                    <option value="3">Concluído</option>
                                </select>`; 
    } else if(data_column === 3){
        $columnInput.innerHTML = `<select id="column" disabled="disabled">
                                    <option value="1">A Fazer</option>
                                    <option value="2">Em Andamento</option>
                                    <option value="3" selected>Concluído</option>
                                </select>`; 
    } else if(!data_column){
        $columnInput.innerHTML = `<select id="column">
                                    <option value="1" selected>A Fazer</option>
                                    <option value="2">Em Andamento</option>
                                    <option value="3">Concluído</option>
                                </select>`; 
    }
}

function editModal(id){
    $modal.style.display = "flex";

    $createTask.style.display = "none";
    $createBtn.style.display = "none";
    $editTask.style.display = "block";
    $editBtn.style.display = "block";

    const index = taskList.findIndex(function(task){
        return task.id == id;
    });

    const task = taskList[index];

    $idInput.value = task.id;
    $titleInput.value = task.title;
    $descriptionInput.value = task.description;
    $priorityInput.value = task.priority;
    $termInput.value = task.term;
    $columnInput.value = task.column;
    $responsibleInput.value = task.responsible;
}

function closeModal(){
    $modal.style.display = "none";

    $idInput.value = "";
    $titleInput.value = "";
    $descriptionInput.value = "";
    $priorityInput.value = "";
    $termInput.value = "";
    $columnInput.value = "";
    $responsibleInput.value = "";
}

function resetColumns(){
    document.querySelector('[data-column="1"] .body .card_list').innerHTML = '';
    document.querySelector('[data-column="2"] .body .card_list').innerHTML = '';
    document.querySelector('[data-column="3"] .body .card_list').innerHTML = '';
}

function createCards(){

    resetColumns();
    taskList.forEach(function(task){
        const formatDate = moment(task.term).format("DD/MM/YYYY");

        const columnBody = document.querySelector(`[data-column="${task.column}"] .body .card_list`);

        const card = `
            <div 
            id="${task.id}"
            class="card" 
            style="background-color: #598392;" 
            ondblclick="editModal(${task.id})" 
            draggable="true"
            ondragstart="dragstartHandler(event)">
                <div class="info">
                    <b>Título</b>
                    <span>${task.title}</span>
                </div>
            
                <div class="info">
                    <b>Descrição</b>
                    <span>${task.description}</span>
                </div>

                <div class="info">
                    <b>Prioridade</b>
                    <span>${task.priority}</span>
                </div>

                <div class="info">
                    <b>Prazo</b>
                    <span>${formatDate}</span>
                </div>

                <div class="info">
                    <b>Responsáveis</b>
                    <span>${task.responsible}</span>
                </div>
            </div>
        `;
        
        columnBody.innerHTML += card;
    });
}

function createTask(){
    const newTask = {
        id: $idInput.value = Math.floor(Math.random() * 9999999),
        title: $titleInput.value,
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        term: $termInput.value,
        column: $columnInput.value,
        responsible: $responsibleInput.value
    }

    taskList.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    createCards();
    closeModal();    
}

function updateTask(){
    const updatedTask = {
        id: $idInput.value,
        title: $titleInput.value,
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        term: $termInput.value,
        column: $columnInput.value,
        responsible: $responsibleInput.value
    }

    const index = taskList.findIndex(function(task){
        return task.id == $idInput.value;
    });

    taskList[index] = updatedTask;

    localStorage.setItem("tasks", JSON.stringify(taskList));

    createCards();
    closeModal();
}

function changeColumn(task_id, column_id){
    if(task_id && column_id){
        taskList = taskList.map((task) => {
            if(task_id != task.id)
                return task;
            
            return {
                ...task,
                column: column_id,
            };
        });
    }

    localStorage.setItem("tasks", JSON.stringify(taskList));

    createCards();
}

var $changecolors = 1;

function darkMode(){
    var $header = document.querySelector('.header');
    var $body = document.querySelector('body');
    var $btnPrimary = document.querySelectorAll('.btnPrimary');
    var $toDoHead = document.getElementById('toDo');
    var $doingHead = document.getElementById('doing');
    var $doneHead = document.getElementById('done');
    var $contColumn = document.querySelectorAll('.container .column');
    var $modalBox = document.querySelector('#modal .box');
    var $cardBG = document.querySelectorAll('.container .column .body .card');
    
    if($changecolors === 1){
        $header.style.backgroundColor = "#598392";
        $body.style.backgroundColor = "#EFF6E0";
        for(let i = 0; i < $btnPrimary.length; i++){
            $btnPrimary[i].style.backgroundColor = "#b4b9a7";
        }
        $toDoHead.style.backgroundColor = "#e15244";
        $doingHead.style.backgroundColor = "#cae725";
        $doneHead.style.backgroundColor = "#40c96d";
        for(let i = 0; i < $contColumn.length; i++){
            $contColumn[i].style.backgroundColor = "#b4b9a7";
        }
        $modalBox.style.backgroundColor = "#598392";
        for(let i = 0; i < $cardBG.length; i++){
            $cardBG[i].style.backgroundColor = "#598392";
        }
        $changecolors = 0;
    } else {
        $header.style.backgroundColor = "#124559";
        $body.style.backgroundColor = "#01161E";
        for(let i = 0; i < $btnPrimary.length; i++){
            $btnPrimary[i].style.backgroundColor = "#598392";
        }
        $toDoHead.style.backgroundColor = "#124559";
        $doingHead.style.backgroundColor = "#124559";
        $doneHead.style.backgroundColor = "#124559";
        for(let i = 0; i < $contColumn.length; i++){
            $contColumn[i].style.backgroundColor = "#598392";
        }
        $modalBox.style.backgroundColor = "#124559";
        for(let i = 0; i < $cardBG.length; i++){
            $cardBG[i].style.backgroundColor = "#124559";
        }
        $changecolors = 1;
    }
}

function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("customData", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const task_id = ev.dataTransfer.getData("customData");
    const column_id = ev.target.dataset.column;

    changeColumn(task_id, column_id);
}