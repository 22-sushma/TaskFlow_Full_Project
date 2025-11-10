export default class Task {
  constructor({ id, title, description, project_id, priority, status, due_date }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.project_id = project_id;
    this.priority = priority;
    this.status = status;
    this.due_date = due_date;
  }
}
