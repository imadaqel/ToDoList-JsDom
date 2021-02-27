let theInput = document.querySelector(".inputText");
let theAssassigneInput = document.querySelector(".assigne");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let noTaskMsg = document.querySelector(".no-tasks-message");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

window.onload = function () {
    theInput.focus();
};

theAddButton.onclick = function () {
    if (theInput.value === '') {
        alert("No Value");
    } else {
        noTaskMsg.remove();
        let mainSpan = document.createElement("span");
        let interSpan1 = document.createElement("div");
        let interSpan2 = document.createElement("div");

        let deleteElement = document.createElement("span");
        let text = document.createTextNode(theInput.value);
        let text2 = document.createTextNode(theAssassigneInput.value);

        let deleteText = document.createTextNode("delete");

        interSpan1.appendChild(text);
        interSpan2.appendChild(text2);

        interSpan1.className = 'task-box';
        mainSpan.innerHTML += interSpan1.outerHTML + interSpan2.outerHTML;


        deleteElement.appendChild(deleteText)
        deleteElement.className = 'delete';

        mainSpan.appendChild(deleteElement);
        tasksContainer.appendChild(mainSpan);

        localStorage["list"] = tasksContainer.innerHTML

        theInput.value = '';
        theAssassigneInput.value = '';
        theInput.focus();

        calculateTasks();

    }
}

document.addEventListener('click', function (event) {
    if (event.target.className == 'delete') {

        event.target.parentNode.remove()
    }

    if (event.target.classList.contains('task-box')) {

        event.target.classList.toggle('finished')
    }
    localStorage["list"] = tasksContainer.innerHTML
    calculateTasks()
})




function calculateTasks() {

    localStorage["count"] = document.querySelectorAll('.task-box').length;
    // console.log(localStorage["count"])
    tasksCount.innerHTML = localStorage["count"];
    localStorage["finishedCount"] = document.querySelectorAll('.finished').length;
    tasksCompleted.innerHTML = localStorage["finishedCount"];
}

if (localStorage["list"]) {
    tasksContainer.innerHTML = localStorage["list"];
    tasksCount.innerHTML = localStorage["count"];
    tasksCompleted.innerHTML = localStorage["finishedCount"];

}