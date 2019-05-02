UPDATE project
SET name = $1,
    description = $2,
    username = $3,
    project_url = $4
WHERE id = $5