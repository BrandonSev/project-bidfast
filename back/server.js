const express = require("express");
require("dotenv").config({path: ".env.local"});
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const db = require("./database");

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(() => cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Ecoute du serveur sur le port 3001 + Connexion a la base de donnée
app.listen("3001", () => {
  db.connect((err) => {
    if (err) {
      console.error('Probleme lors de la Connexion à la base de donnée');
      return;
    }
    console.log('Connexion à la base de donnée réussi')
  })
  console.log("Serveur demarré sur le port 3001");
});
