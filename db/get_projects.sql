-- SELECT *
-- FROM project;

select *
from project as p
inner join project_list as pl on pl.project_id = p.id
inner join users as u on u.id = pl.user_id
where user_id = $1;