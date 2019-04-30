module.exports = {
  addProject: (req, res) => {
    const db = req.app.get("db");
    const { name, description, author, location } = req.body;
    db.add_project([name, description, author, location]).catch(err =>
      console.log(err)
    );
    res.sendStatus(200);
  },
  getAllProjects: async (req, res) => {
    const db = req.app.get("db");
    const projects = await db.get_projects().catch(err => console.log(err));
    res.status(200).json(projects);
  },
  removeProject: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.remove_project(id).catch(err => console.log(err));
    res.sendStatus(200);
  }
};
