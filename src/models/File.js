export default class File {
  constructor({ id, task_id, path, uploaded_by, created_at }) {
    this.id = id;
    this.task_id = task_id;
    this.path = path;
    this.uploaded_by = uploaded_by;
    this.created_at = created_at;
  }
}
