const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");
const helmet = require("helmet");
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const dotEnv = require("dotenv").config()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Mettre en place la connexion à la base de données 
mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@clusterlucas.xl07tso.mongodb.net/piiquante?retryWrites=true&w=majority`,
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

// Protection express avec Helmet

app.use(helmet());

// Mettre en place les routes 

app.use("/api/auth",userRoutes)
app.use("/api/sauces",sauceRoutes)
app.use(xss())
app.use(mongoSanitize())
app.use(limiter)

module.exports = app