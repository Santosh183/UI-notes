const newTaskButton = document.querySelector(".button-add-task");
const backdrop = document.querySelector("#backdrop");
const addTaskModal = document.querySelector(".modal-add-task");
const deleteTaskModal = document.querySelector(".modal-delete-task");
const cancelModal = document.querySelector(".cross-cancel");
const form = document.querySelector("form");
const addConfirmButton = document.querySelector(".add-confirm");
const addCancelButton = document.querySelector(".add-cancel");
const nameInput = document.getElementById("name-input");
const descriptionInput = document.getElementById("description-input");
const dateInput = document.getElementById("date-input");
const priorityInput = document.getElementById("priority-input");
const taskList = document.querySelector(".task-list");
const deleteConfirm = document.querySelector(".delete-confirm");
const deleteCancel = document.querySelector(".delete-cancel");
var currentTaskName = "";
var currentListitem;

const taskArray = [];

const addNewTaskPopUpHandler = function () {
  backdrop.style.display = "block";
  addTaskModal.style.display = "block";
};
const hideBackdrop = function () {
  backdrop.style.display = "none";
  hideAddTaskModal();
  hideDeleteTaskModal();
};
const hideAddTaskModal = function () {
  addTaskModal.style.display = "none";
};
const hideDeleteTaskModal = function () {
  deleteTaskModal.style.display = "none";
};
const deleteTaskModalHandler = function (event) {
  backdrop.style.display = "block";
  deleteTaskModal.style.display = "block";
  currentTaskName = event.target.nextElementSibling.innerText;
  currentListitem = event.target.parentElement;
  console.log(currentTaskName);
};
const clearInPutHandler = function () {
  nameInput.value = "";
  descriptionInput.value = "";
  priorityInput.value = null;
  dateInput.value = null;
  currentTaskName = "";
  hideBackdrop();
};
const addTaskToList = function () {
  let element = document.createElement("li");
  element.innerHTML = `
    <span class="delete-cross">x</span>
    <div class="task-title">${nameInput.value}</div>
    <div class="task-description">
      ${descriptionInput.value}
    </div>
    <div class="task-date-priority">
      <div class="date">
      ${dateInput.value}
      </div>
      <div class="priority">
        <span> ${priorityInput.value} &uarr;</span>
      </div>
    </div>`;
  taskList.append(element);
  taskArray.push({
    name: nameInput.value,
    description: descriptionInput.value,
    date: dateInput.value,
    priority: priorityInput.value,
  });
  element.addEventListener("click", deleteTaskModalHandler);
  clearInPutHandler();
  console.log(taskArray);
};
const deleteCancelled = function () {
  hideBackdrop();
};
const deleteConfirmed = function () {
  console.log("deleteing task: " + currentTaskName);
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].name === currentTaskName) {
      taskArray.splice(i, 1);
      break;
    }
  }
  currentListitem.remove();
  hideBackdrop();
};

newTaskButton.addEventListener("click", addNewTaskPopUpHandler);
backdrop.addEventListener("click", hideBackdrop);
cancelModal.addEventListener("click", clearInPutHandler);
form.addEventListener("submit", addTaskToList);
addConfirmButton.addEventListener("click", addTaskToList);
addCancelButton.addEventListener("click", clearInPutHandler);
deleteCancel.addEventListener("click", deleteCancelled);
deleteConfirm.addEventListener("click", deleteConfirmed);
