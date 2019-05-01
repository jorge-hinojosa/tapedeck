module.exports = {
  addNewProject: async (req, res) => {
    const db = req.app.get("db");
    const { name, description, username, location } = req.body;
    const { id } = req.session.user;

    const result = await db
      .check_for_project(location)
      .catch(err => console.log(err));

    if (result[0] === undefined) {
      const newProjectId = await db
        .add_new_project([name, description, username, location])
        .catch(err => console.log(err));
      console.log(newProjectId[0].id);
      db.add_to_projectlist([id, newProjectId[0].id]).catch(err =>
        console.log(err)
      );
      res.sendStatus(200);
    } else {
      res.sendStatus(409);
    }
  },
  getAllProjects: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    console.log(id);
    const projects = await db.get_projects(id).catch(err => console.log(err));
    res.status(200).json(projects);
  },
  removeProject: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log(id);
    db.remove_project(id).catch(err => console.log(err));
    res.sendStatus(200);
  }
};
