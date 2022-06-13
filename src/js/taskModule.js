import { de } from "date-fns/locale";
import { compareAsc, format, formatDistance } from "date-fns";

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const deadlineDate = document.querySelector("#deadline-date");
const deadlineTime = document.querySelector("#deadline-time");
const priority = document.querySelector("#priority");

class Task {

  static get type() {
    return "This class is " + this.name;
  }

  constructor(title, description, deadlineDate, deadlineTime, priority, done = false) {
    this.title = title;
    this.description = description;
    this.deadline = (deadlineDate == "" ? new Date() : deadlineDate)
     + (deadlineTime == "" ? "" : `T${deadlineTime}:00`);
    this.priority = priority;
    this.done = done;
  }
  
}

export default function createTask() {
  const task = new Task(
    title.value,
    description.value,
    deadlineDate.value,
    deadlineTime.value,
    priority.value
  );
  return task;
}
