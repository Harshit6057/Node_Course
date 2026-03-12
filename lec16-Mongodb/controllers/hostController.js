const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    favouriteHomes: [],
    editing: false,
  });
};

exports.getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  try {
    const home = await Home.findById(homeId);
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
    });
  } catch (error) {
    next(error);
  }
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  } catch (error) {
    next(error);
  }
};

exports.postAddHome = async (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  try {
    await home.save();
    res.redirect("/host/host-home-list");
  } catch (error) {
    console.log("Error while adding home", error);
    res.redirect("/host/add-home");
  }
};

exports.postEditHome = async (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, undefined, id);
  try {
    await home.save();
    res.redirect("/host/host-home-list");
  } catch (error) {
    console.log("Error while editing home", error);
    res.redirect(`/host/edit-home/${id}?editing=true`);
  }
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  try {
    await Home.deleteById(homeId);
    res.redirect("/host/host-home-list");
  } catch (error) {
    console.log('Error while deleting ', error);
    res.redirect("/host/host-home-list");
  }
};
