const express = require("express");
require("dotenv").config({path: ".env.local"});
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const db = require("./database");
const UserRoutes = require("./routes/user.routes");
const OfferRoutes = require("./routes/offer.routes");
const OfferBiddingRoutes = require('./routes/offerBidding.routes')
const {checkUser, isAuthenticated} = require("./middleware/auth.middleware");

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('*', checkUser)

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/offers", OfferRoutes);
app.use("/api/offerBiddings", OfferBiddingRoutes);

app.get('/jwtid', isAuthenticated, (req, res) => {
  res.status(200).json({id: res.locals.user.id})
});
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
