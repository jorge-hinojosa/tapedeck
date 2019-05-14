INSERT INTO project (name, description, latest_user, project_url, upload_date)
VALUES ($1,
        $2,
        $3,
        $4,
        $5) RETURNING id;

