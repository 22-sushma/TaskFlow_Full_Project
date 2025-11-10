export default class Project {
  constructor({ id, name, description, team_id, start_date, end_date, parent_id }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.team_id = team_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.parent_id = parent_id;
  }
}
