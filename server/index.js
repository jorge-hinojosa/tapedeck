require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const ac = require("./controllers/auth_controller");
// const uc = require("./controllers/user_controller");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

//DB Connection
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database connected");
  })
  .catch(err => console.log(err));

//Initializing sessions
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//Enabling body-parser
app.use(express.json());

//Auth endpoints
app.get("/auth/session");
app.post("/auth/login", ac.login);
app.post("/auth/signup", ac.signup);
app.get("/auth/logout", ac.logout);
app.get("/auth/user-data", ac.getUserData);

//User endpoint

//Server listening
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
