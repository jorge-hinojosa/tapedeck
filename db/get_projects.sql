select *
from project as p
inner join project_list as pl on pl.project_id = p.id
inner join users as u on u.id = pl.author_id -- OR u.id = pl.collaborator_id

where author_id = $1
  and shared = 'false'
order by p.id desc;

