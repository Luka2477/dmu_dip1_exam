import express from "express";
import session from "express-session";

const app = express();

app.set("view engine", "pug");
app.set("views", "templates");

app.use(express.static("filer"));
app.use(express.json());
app.use(session({ secret: "hemmelig", saveUninitialized: true, resave: true }));

app.get("/", (req, res) => {
  if (!req.session.contacts) {
    req.session.contacts = [
      { id: 1, name: "Lukas", phone: "12312312" },
      { id: 2, name: "Berta", phone: "98798798" },
      { id: 3, name: "Martina", phone: "12345678" },
    ];
  }

  res.status(200).render("index", { contacts: req.session.contacts });
});

app
  .get("/contacts", (req, res) => {
    const contacts = req.session.contacts || [];

    res.status(200).json({ contacts });
  })
  .post("/contacts", (req, res) => {
    const { name, phone } = req.body;
    const contacts = req.session.contacts || [];
    const id = (contacts[contacts.length - 1]?.id || 0) + 1;
    const newContact = { id, name, phone };

    req.session.contacts = [...contacts, newContact];

    res.status(201).json({ contact: newContact });
  })
  .patch("/contacts", (req, res) => {
    const { id, phone } = req.body;
    const contacts = req.session.contacts || [];

    let updatedContact;
    for (let contact of contacts) {
      if (contact.id === id) {
        contact.phone = phone;
        updatedContact = contact;
        break;
      }
    }

    req.session.contacts = [...contacts];

    res.status(201).json({ contact: updatedContact });
  });

app.listen(8080);
console.log("Lytter på port 8080 ...");
