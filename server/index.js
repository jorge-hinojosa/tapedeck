require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const ac = require("./controllers/auth_controller");
const pc = require("./controllers/project_controller");
const uc = require("./controllers/user_controller");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

app.use(express.static(`${__dirname}/../build`));

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

//Enabling AWS S3
let sign_s3 = require("./aws_config");
app.use("/sign_s3", sign_s3.sign_s3);

//Auth endpoints
app.post("/auth/login", ac.login);
app.post("/auth/signup", ac.signup);
app.get("/auth/logout", ac.logout);
app.get("/auth/user-data", ac.getUserData);
app.put("/auth/user-data/:id", ac.editUser);

//Project endpoints
app.get("/api/project", pc.getAllProjects);
app.get("/api/project/:id", pc.getProject);
app.post("/api/project", pc.addNewProject);
app.delete("/api/project/:id", pc.removeProject);
app.put("/api/project/:id", pc.updateCurrVersion);
app.put("/api/project/edit/:id", pc.editProject);

//Version endpoints
app.get("/api/project/versions/:id", pc.getAllVersions);
app.post("/api/project/versions", pc.addNewVersion);
app.delete("/api/project/versions/:id", pc.removeVersion);
app.put("/api/project/versions/:id", pc.editVersion);

//User endpoints
app.get("/api/user", uc.findUser);
app.post("/api/user", uc.inviteUser);

//Server listening
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
