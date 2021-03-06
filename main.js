let Input = document.querySelector(".inputText");
let AssassigneInput = document.querySelector(".assigne");
let search = document.querySelector(".search");
let AddButton = document.querySelector(".add-task .plus");
let SearchButton = document.querySelector(".search-button");
let tasksContainer = document.querySelector(".tasks-content");
let noTaskMsg = document.querySelector(".no-tasks-message");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

window.onload = function () {
    Input.focus();
    getFromLocalStorage()
};

AddButton.onclick = function () {
    if (Input.value === '') {
        alert("No Value");
    } else {
        noTaskMsg.remove();
        let interSpan1 = document.createElement("div");
        let interSpan2 = document.createElement("div");
        let taskText = document.createTextNode(Input.value);
        let taskAssig = document.createTextNode(AssassigneInput.value);

        let list = JSON.parse(localStorage.getItem('list'));
        if (!list) {
            list = [];
        }
        list.push({ 'task': taskText.data, 'assignee': taskAssig.data, 'finish': false });
        localStorage.setItem('list', JSON.stringify(list));
        tasksContainer.innerHTML = '';
        render(list);
        Input.value = '';
        AssassigneInput.value = '';
        Input.focus();
        calculateTasks(list);
    }
}

function render(array) {
    tasksContainer.innerHTML = '';
    array.forEach(elem => {
        let mainSpan = document.createElement("span");
        let deleteElement = document.createElement("span");
        let deleteText = document.createTextNode("delete");
        deleteElement.appendChild(deleteText)
        deleteElement.className = 'delete';
        let finishElement = document.createElement("span");
        let finishText = document.createTextNode("finish");
        finishElement.appendChild(finishText)
        finishElement.className = 'finish';

        let everytask = {
            task: elem.task,
            assignee: elem.assignee,
            status: elem.finish
        };
        mainSpan.innerHTML = `
      <div>
      <h4 className="header">${everytask.task}</h4>
      <p id="toggle">${everytask.assignee}</p>
      <h5 id='status'>${everytask.status}</h5>
     </div>
     `;
        mainSpan.appendChild(deleteElement);
        mainSpan.appendChild(finishElement);
        mainSpan.className = 'task-box';
        tasksContainer.appendChild(mainSpan);
    });
}

function getFromLocalStorage() {
    let list = JSON.parse(localStorage.getItem('list'));
    if (!list) {
        return;
    }
    console.log(list)
    noTaskMsg.remove();
    render(list);
    calculateTasks(list);
}

document.addEventListener('click', function (event) {
    if (event.target.className == 'finish') {
        statusId = event.target.parentNode.firstElementChild.firstElementChild.innerHTML;
        let list = JSON.parse(localStorage.getItem('list'));
        if (!list) {
            list = [];
        }
        for (var i in list) {
            if (list[i].task == statusId) {
                list[i].finish = !list[i].finish;
                break;
            }
        }
        localStorage.setItem('list', JSON.stringify(list));
        tasksContainer.innerHTML = '';
        render(list);
        getFromLocalStorage()
    }
    if (event.target.className == 'delete') {
        deleteId = event.target.parentNode.firstElementChild.firstElementChild.innerHTML;
        console.log(deleteId)
        let list = JSON.parse(localStorage.getItem('list'));
        if (!list) {
            list = [];
        }
        const deletelist = list.filter(e => !e.task.includes(deleteId));
        localStorage.setItem('list', JSON.stringify(deletelist));
        tasksContainer.innerHTML = '';
        getFromLocalStorage()
    }

    calculateTasks()
})

function calculateTasks(list) {

    var finishlist = list.filter(e => e.finish);
    tasksCompleted.innerHTML = finishlist.length;
    console.log(localStorage["finishedCount"]);
    localStorage["count"] = list.length;
    tasksCount.innerHTML = localStorage["count"];
}
SearchButton.onclick = function () {
    if (search.value === '') {
        return;
    }
    let list = JSON.parse(localStorage.getItem('list'));
    if (!list) {
        return;
    }
    let filtterdList = _.find(list, function (item) {
        return item.task.indexOf(search.value) !== -1 || item.assignee.indexOf(search.value) !== -1;
    });
    var arrayfiltterdList = [];
    arrayfiltterdList.push(filtterdList);
    console.log(arrayfiltterdList);
    tasksContainer.innerHTML = '';
    render(arrayfiltterdList);
}

