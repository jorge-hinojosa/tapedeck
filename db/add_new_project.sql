INSERT INTO project (name, description, latest_user, project_url)
VALUES ($1,
        $2,
        $3,
        $4) RETURNING id;

