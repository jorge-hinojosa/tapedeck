INSERT INTO project (name, description, username, project_url)
VALUES ($1,
        $2,
        $3,
        $4) RETURNING id;

