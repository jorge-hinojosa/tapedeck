SELECT id,
       first_name,
       last_name
FROM users
WHERE first_name ILIKE $1;