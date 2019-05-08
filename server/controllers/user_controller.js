module.exports = {
  findUser: async (req, res) => {
    const db = req.app.get("db");
    const { first_name } = req.query;
    const result = await db
      .search_user("%" + first_name + "%")
      .catch(err => console.log(err));
    res.status(200).json(result);
  },
  inviteUser: (req, res) => {
    const db = req.app.get("db");
    const { user_id, project_id } = req.body;
    const { id } = req.session.user;
    console.log(req.body);
    db.add_user_to_project([id, project_id, user_id]).catch(err =>
      console.log(err)
    );
    res.sendStatus(200);
  }
};
