UPDATE users
SET first_name = $2,
    last_name = $3,
    username = $4,
    image = $5,
    location = $6,
               bio = $7
WHERE id = $1;

