const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");

// Mettre en place la connexion à la base de données 
mongoose.connect('mongodb+srv://Lucas:Chrispaul3@clusterlucas.xl07tso.mongodb.net/piiquante?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(() => console.log("Connexion à MongoDB échouée !"));

// Mise en place appli express
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
  });

app.use(express.json())

app.use("/images",express.static(path.join(__dirname,"images")))

// Mettre en place les routes 

app.use("/api/auth",userRoutes)
app.use("/api/sauces",sauceRoutes)



module.exports = app