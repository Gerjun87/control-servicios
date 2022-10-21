import { uniqueDates } from "../services/date.js";
import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";
import { displayTasks } from "./readTasks.js";

export const addTask = (event) => {
    event.preventDefault();
    const list = document.querySelector("[data-list]");
    const input = document.querySelector("[data-form-input]");
    const input1 = document.querySelector("[data-form-input1]");
    const input2 = document.querySelector("[data-form-input2]");
    const input3 = document.querySelector("[data-form-input3]");
    const input4 = document.querySelector("[data-form-input4]");
    const calendar = document.querySelector("[data-form-date]");

    const value = input.value;
    const value1 = input1.value;
    const value2 = input2.value;
    const value3 = input3.value;
    const value4 = input4.value;
    const date = calendar.value;
    const dateFormat = moment(date).format("DD/MM/YYYY");

    if (value == "" || value1 == "" || value2 == "" || value3 == "" || value4 == "" || date == "") {
        return;
    }

    input.value = "";
    input1.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    calendar.value = "";

    const complete = false;

    const taskObj = {
        value,
        value1,
        value2,
        value3,
        value4,
        dateFormat,
        complete,
        id: uuid.v4(),
    };

    list.innerHTML = "";

    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    displayTasks();
};

export const createTask = ({ value, value1, value2, value3, value4, dateFormat, complete, id }) => {
    const task = document.createElement("li");
    task.classList.add("card");

    const taskContent = document.createElement("div");

    const check = checkComplete(id);

    if (complete) {
        check.classList.toggle("fas");
        check.classList.toggle("completeIcon");
        check.classList.toggle("far");
    }
    const titleTask = document.createElement("span");
    const titleTask1 = document.createElement("span");
    const titleTask2 = document.createElement("span");
    const titleTask3 = document.createElement("span");
    const titleTask4 = document.createElement("span");
    titleTask.classList.add("task");
    titleTask.innerHTML = "Marca: " + value + ".";
    titleTask1.innerHTML = "Mod.: " + value1 + ".";
    titleTask2.innerHTML = "N°: " + value2 + ".";
    titleTask3.innerHTML = "Sr/a: " + value3 + ".";
    titleTask4.innerHTML = "$" + value4;
    taskContent.appendChild(check);
    taskContent.appendChild(titleTask);
    taskContent.appendChild(titleTask1);
    taskContent.appendChild(titleTask2);
    taskContent.appendChild(titleTask3);
    taskContent.appendChild(titleTask4);

    const dateElement = document.createElement("span");
    dateElement.innerHTML = dateFormat;
    task.appendChild(taskContent);
    task.appendChild(dateElement);
    task.appendChild(deleteIcon(id));
    return task;
};
