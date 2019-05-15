SELECT id,
       first_name,
       last_name,
       username,
       image
FROM users
WHERE first_name ILIKE $1
  or username ILIKE $1;