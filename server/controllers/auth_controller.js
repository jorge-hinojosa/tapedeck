const bcrypt = require("bcryptjs");

module.exports = {
  signup: async (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, email, username, password } = req.body;

    const result = await db.get_user(username).catch(err => console.log(err));
    const existingUser = result[0];

    if (!existingUser) {
      const hash = await bcrypt
        .hash(password, 10)
        .catch(err => console.log(err));
      const registeredUser = await db
        .add_user([first_name, last_name, email, username, hash])
        .catch(err => console.log(err));

      const user = registeredUser[0];

      req.session.user = {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio,
        image: user.image,
        location: user.location
      };

      res.status(201).json(req.session.user);
    } else {
      res.status(409).json("Username taken");
    }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const result = await db.get_user(username).catch(err => console.log(err));
    const user = result[0];

    if (user) {
      let isAuthenticated = await bcrypt.compareSync(password, user.password);

      if (isAuthenticated) {
        req.session.user = {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          bio: user.bio,
          image: user.image,
          location: user.location
        };
        res.status(200).json(req.session.user);
      } else {
        res.status(401).json("Incorrect username or password");
      }
    } else {
      res.status(401).json("Incorrect username or password");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUserData: (req, res) => {
    const { user } = req.session;

    if (user) return res.status(200).json(user);
    else return res.sendStatus(401);
  }
};
