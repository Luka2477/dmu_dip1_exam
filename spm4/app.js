import express from "express";
import session from "express-session";

const app = express();

app.set("view engine", "pug");
app.set("views", "templates");

app.use(session({ secret: "hemmelig", saveUninitialized: true, resave: true }));
app.use(express.static("filer"));
app.use(express.json());

app.get("/", function (req, res) {
  const users = req.session.users || [];

  res.render("index", { users });
});

app.get("/users", (req, res) => {
  const users = req.session.users || [];

  res.status(200).json({ users });
});

app.post("/users", (req, res) => {
  const { name, address } = req.body;
  const users = req.session.users || [];
  const newUsers = [...users, { name, address }];

  req.session.users = newUsers;

  res.status(201).json({ users: newUsers });
});

app.listen(8080);
console.log("Lytter på port 8080 ...");

/*
  express-session er et standard Express middleware
  Det understøtter identifikation af en bruger/klient 
  Session data gemmes på serveren
  Kun session ID gemmes på klienten – i en cookie

  Session storage
    Default session storage MemoryStore er designet til udvikling og test – og ikke til produktion
    Der er række kompatible session stores, bl.a. baseret på MongoDB
    connect-mongodb-session er udviklet af MongoDB selv
*/
