module.exports = {
  addProject: async (req, res) => {
    const db = req.app.get("db");
    const { location } = req.body;
    await db.add_project(location).catch(err => console.log(err));
    res.sendStatus(200);
  }
};
