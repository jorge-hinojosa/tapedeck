UPDATE project
SET name = $2,
    description = $3,
    latest_user = $4,
    project_url = $5
WHERE id = $1