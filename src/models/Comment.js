export default class Comment {
  constructor({ id, task_id, user_id, content, parent_id, created_at }) {
    this.id = id;
    this.task_id = task_id;
    this.user_id = user_id;
    this.content = content;
    this.parent_id = parent_id;
    this.created_at = created_at;
  }
}
