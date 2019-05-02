DELETE
FROM project_list
WHERE project_id = $1;


DELETE
FROM project_version
WHERE project_id = $1;


DELETE
FROM project
WHERE id = $1;