import "./css/style.css";
import "./css/list.css";
import "./css/form.css";
import "./css/header.css";
import { compareAsc, format, formatDistance, formatRelative } from "date-fns";
import createTask from "./js/taskModule.js";

const currentDate = document.querySelector(".current-date");
currentDate.innerHTML = format(new Date(), "d LLL, eeee");


const addBtn = document.querySelector(".add.btn");
const smbBtn = document.querySelector("#sumbit-button");
const ul = document.querySelector(".ul");
const form = document.querySelector("form");

let tasks = [];
getLocalStorage();
displayLocalStorage();

function setLocalStorage() {
  localStorage.setItem("Maintasks", JSON.stringify(tasks));
}

function getLocalStorage() {
  tasks = JSON.parse(localStorage.getItem("Maintasks")) || [];
}

function displayLocalStorage() {
  ul.innerHTML = "";
  tasks.map((e) => {
    const li = document.createElement("div");
    li.classList.add("list");

    const marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    marker.setAttribute("viewBox", "0 0 100 100");
    marker.innerHTML = `<circle cx="50" cy="50" r="40"/>`;
    marker.addEventListener("click", () => {
      marker.classList.toggle("done");
      e.done = !e.done;
      checkIsDone(li);
      setLocalStorage();
    });

    const title = document.createElement("h3");
    title.classList.add("li-title");
    title.textContent = e.title;

    const description = document.createElement("p");
    description.classList.add("li-description");
    description.textContent = e.description;

    const deadline = document.createElement("p");
    deadline.classList.add("li-deadline");
    console.log(e.deadline);
    deadline.textContent = formatRelative(Date.parse(e.deadline), new Date());


    const priority = document.createElement("p");
    priority.classList.add("li-priority");
    priority.textContent = `Priority: ${e.priority}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete task";

    delBtn.addEventListener("click", () => {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === e) {
          tasks.splice(i, 1);
        }
        setLocalStorage();
        displayLocalStorage();
      }
    });
    const data = document.createElement("div");
    data.classList.add("data");

    data.appendChild(title);
    data.appendChild(description);
    data.appendChild(deadline);
    data.appendChild(priority);
    data.appendChild(delBtn);
    li.appendChild(marker);
    li.appendChild(data);
    ul.appendChild(li);
  });
}

function checkIsDone(e) {
  if (!e.done) {
    e.classList.toggle("done");
  }
}

smbBtn.addEventListener("click", () => {
  tasks.push(createTask());
  setLocalStorage();
  displayLocalStorage();
});

addBtn.addEventListener("click", () => {
  form.classList.toggle("none");
});
