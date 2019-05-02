SELECT *
FROM project_versions
WHERE project_id = $1
ORDER BY id DESC;