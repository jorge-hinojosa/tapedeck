module.exports = {
  getUserData: async (req, res) => {
    const db = req.app.get("db");
    const { username } = req.session;

    const user = await db.get_user(username).catch(err => console.log(err));
    res.status(200).json(user);
  }
};
