UPDATE project_versions
SET name = $2
WHERE project_id = $1;