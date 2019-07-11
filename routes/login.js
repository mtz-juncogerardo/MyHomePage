const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");

module.exports = app => {
  let userSettings = mongoose.model("settings");

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  //Pagina de Registro
  app.get("/register", (req, res) => {
    res.render("register");
  });
  //Registrandose
  app.post("/newUser", (req, res) => {
    userSettings.findOne({ email: req.body.email }, (err, email) => {
      if (email) {
        res.render("register", {
          msg: "El E-mail ya se encuentra registrado intenta iniciar sesión"
        });
      }

      //Checking Password Security
      else if (req.body.pass.length < 8) {
        res.render("register", { msg: "Contraseña minima 8 Caracteres" });
      } else if (req.body.pass !== req.body.repass) {
        res.render("register", { msg: "Las contraseñas no coinciden" });
      }

      //Hash password
      else {
        bcrypt.hash(req.body.pass, 10, (err, hash) => {
          //Create user in DB
          new userSettings({
            email: req.body.email,
            password: hash,
            googleFont: "Lato",
            fontLink: "Lato",
            apodo: req.body.apodo,
            colorCode: "#ffffff",
          }).save();
          res.redirect("/login");
        });
      }
    });
  });

  //Haciendo Login
  app.get("/login", (req, res) => {

    jwt.verify(req.cookies.jwtToken, process.env.jsonSecret, (err, decoded)=>{

      if(decoded){
        res.redirect('/homePage');
      }
      else{
        res.render("login");
      }
    });
  });

  app.post("/login", (req, res) => {
    userSettings.findOne({ email: req.body.email }, (err, person) => {
      if (!person) {
        res.render("login", { msg: "Usuario o Contraseña Incorrecta" });
      } else {
        bcrypt.compare(req.body.pass, person.password, (err, response) => {
          if (response) {
            jwt.sign({ email: person.email }, process.env.jsonSecret, (err, authToken) => {
              res.cookie('jwtToken', authToken, {maxAge: 1600000000});
              res.redirect('/homePage'); 
            });
          } else {
            res.render("login", { msg: "Usuario o Contraseña Incorrecta" });
          }
        });
      }
    });
  });
};
