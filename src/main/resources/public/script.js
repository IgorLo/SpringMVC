function createRequest() {
    var request = false;

    if (window.XMLHttpRequest) {
        //Gecko-совместимые браузеры, Safari, Konqueror
        request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //Internet explorer
        try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (CatchException) {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!request) {
        alert("Невозможно создать XMLHttpRequest");
    }

    return request;
}

function sendPostRequest(path, args, handlerMethod) {
    var request = createRequest();
    if (!request) {
        return;
    }

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                handlerMethod(request);
            } else {
                alert("Ошибка при обработке запроса")
            }
        } else {
            //загрузка
        }
    };

    request.open("POST", path, true);
    // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    request.send(args);
}

function addNewTaskByJson(request) {
    var responseData = eval("(" + request.responseText + ")");
    var isSelected = responseData.checked;
    var description = responseData.description;
    var id = responseData.id;

    addNewTask(isSelected, description, id);
}

function deleteTaskById(id) {
    var button = document.getElementById(id);
    var taskToDelete = button.parentElement;
    taskToDelete.parentElement.removeChild(taskToDelete);
}

function deleteTaskByEvent(mouseEvent) {
    var id = mouseEvent.target.id;
    deleteTaskById(id);
}

function addNewTask(isSelected, description, id) {
    var taskClone = document.querySelector('.template').cloneNode(true);
    // taskClone.classList.remove('template');
    taskClone.querySelector('.todo-item__text').textContent = description;
    if (isSelected) {
        taskClone.classList.add('todo-item__selected');
        taskClone.querySelector('.todo-item__checkbox').checked = true;
    }
    var button = taskClone.getElementsByClassName('todo-item__button')[0];
    button.id = id;
    button.onclick = deleteTaskByEvent;
    var parent = document.querySelector('.todo-list > ul');
    var beforeElement = document.querySelector('.todo-list__emptyFiller');
    parent.insertBefore(taskClone, beforeElement);
}

function initDeleteEvent(element) {
    element.onclick = deleteTaskByEvent;
}

function handleAddButtonClick() {
    var inputField = document.querySelector('.todo-creator__input');
    var description = inputField.value;
    if (description.trim() === ""){
        alert("Task text is empty!1!");
        return;
    }
    inputField.value = "";
    var data = new FormData();
    data.append("description", description);
    sendPostRequest("/create", data, addNewTaskByJson);
}