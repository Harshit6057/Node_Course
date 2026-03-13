const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn 
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

exports.postAddHome = async (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  try {
    await home.save();
    console.log("Home Saved successfully");
  } catch (error) {
    console.log("Error while saving home", error);
  }

  res.redirect("/host/host-home-list");
};

exports.postEditHome = async (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  try {
    await home.save();
    console.log("Home updated");
  } catch (err) {
    console.log("Error while updating ", err);
  }
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  try {
    await Home.deleteById(homeId);
    res.redirect("/host/host-home-list");
  } catch (error) {
    console.log("Error while deleting ", error);
  }
};
