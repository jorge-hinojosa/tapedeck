module.exports = {
  addNewProject: async (req, res) => {
    const db = req.app.get("db");
    const { name, description, username, url, uploadDate } = req.body;
    const { id } = req.session.user;

    const result = await db
      .check_for_project(name)
      .catch(err => console.log(err));

    if (result[0] === undefined) {
      const newProjectId = await db
        .add_new_project([name, description, username, url, uploadDate])
        .catch(err => console.log(err));
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

    const originalProjects = await db
      .get_projects(id)
      .catch(err => console.log(err));
    const sharedProjects = await db
      .get_shared_projects(id)
      .catch(err => console.log(err));
    const allProjects = originalProjects.concat(sharedProjects);
    res.status(200).json(allProjects);
  },
  getProject: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    const project = await db.get_project(id).catch(err => console.log(err));
    res.status(200).json(project);
  },
  removeProject: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.remove_project(id).catch(err => console.log(err));
    res.sendStatus(200);
  },
  updateCurrVersion: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {
      name,
      updatedDescription,
      updatedUsername,
      url,
      updatedUploadDate
    } = req.body;

    const result = await db
      .update_current_version([
        id,
        name,
        updatedDescription,
        updatedUsername,
        url,
        updatedUploadDate
      ])
      .catch(err => console.log(err));
    res.status(200).json(result);
  },
  editProject: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {
      updatedProjectname,
      updatedDescription,
      username,
      project_url,
      upload_date
    } = req.body;

    await db
      .update_current_version([
        id,
        updatedProjectname,
        updatedDescription,
        username,
        project_url,
        upload_date
      ])
      .catch(err => console.log(err));

    await db
      .edit_project_name([id, updatedProjectname])
      .catch(err => console.log(err));
    res.sendStatus(200);
  },
  addNewVersion: (req, res) => {
    const db = req.app.get("db");
    const {
      project_id,
      name,
      description,
      username,
      project_url,
      upload_date
    } = req.body;

    db.add_version(
      project_id,
      name,
      description,
      username,
      project_url,
      upload_date
    ).catch(err => console.log(err));
    res.sendStatus(200);
  },
  getAllVersions: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const versions = await db.get_versions(id).catch(err => console.log(err));
    res.status(200).json(versions);
  },
  removeVersion: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.remove_version(id).catch(err => console.log(err));
    res.sendStatus(200);
  },
  editVersion: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {
      project_id,
      name,
      updatedDescription,
      username,
      project_url
    } = req.body;

    await db
      .edit_version([
        id,
        project_id,
        name,
        updatedDescription,
        username,
        project_url
      ])
      .catch(err => console.log(err));
    res.sendStatus(200);
  }
};
