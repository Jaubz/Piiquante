const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.signup = (req,res,next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password,10)
    .then((hash)=>{
        const newUser = new User({
            email: req.body.email,
            password : hash
        })
        newUser.save()
        .then(()=>res.status(200).json({message:"Utilisateur bien enregistré en base de données"}))
        .catch((error)=>res.status(500).json({error}))
    })
    .catch((error)=>res.status(500).json({error}))
}

exports.login = (req,res,next) => {
    console.log(req.body)
    User.findOne({
        email : req.body.email
    })
    .then((user)=>{
        if(!user){
            res.status(401).json({message:"Email ou mot de passe incorrect"})
        }
        bcrypt.compare(req.body.password,user.password)
        .then((valid)=>{
           if(!valid){
                res.status(401).json({message:"Email ou mot de passe incorrect"})
            }
            res.status(200).json({
                userId : user._id,
                token : jwt.sign({userId : user._id},`${process.env.TOKEN}`,{expiresIn:"24h"})
            })
        })
        .catch((error)=>res.status(500).json({error}))
    })
    .catch((error)=>res.status(500).json({error}))
}