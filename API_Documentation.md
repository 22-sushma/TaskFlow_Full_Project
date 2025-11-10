# TaskFlow API Documentation (brief)

Base: /api/v1

Projects:
  GET /projects
  POST /projects {name, description, team_id, start_date, end_date, parent_id}
  GET /projects/:id
  PUT /projects/:id
  DELETE /projects/:id

Tasks:
  GET /tasks?project_id=
  POST /tasks {title, description, project_id, priority, status, assignees, due_date}
  GET /tasks/:id
  PUT /tasks/:id
  DELETE /tasks/:id

Teams:
  GET /teams
  POST /teams {name, description, members}
  POST /teams/:teamId/members {user_id, role}

Comments:
  POST /comments {task_id, user_id, content, parent_id}
  GET /comments/task/:taskId

Analytics:
  GET /analytics/project/:projectId/progress
  GET /analytics/team/:teamId/productivity
