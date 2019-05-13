UPDATE project_versions
SET project_id = $2,
    name = $3,
    description = $4,
    username = $5,
    project_url = $6
WHERE id = $1;