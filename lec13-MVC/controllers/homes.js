const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("addHome", {
    pageTitle: "Add Home to Airbnb",
    currentPage: "addHome"
  });
};

exports.postAddHome = (req, res, next) => {
  console.log("Home Registration Successful", req.body);

  const { houseName, price, location, rating, photoUrl } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("homeadded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded"
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("home", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb Home"
    });
  });
};