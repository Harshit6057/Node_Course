const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

exports.getHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const favourites = await Favourite.getFavourites();
    const favouriteIds = favourites.map((fav) => fav.houseId);
    const registeredHomes = await Home.fetchAll();
    const favouriteHomes = registeredHomes.filter((home) =>
      favouriteIds.includes(home.id)
    );

    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  try {
    const fav = new Favourite(homeId);
    await fav.save();
  } catch (err) {
    console.log("Error while marking favourite: ", err);
  } finally {
    res.redirect("/favourites");
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  try {
    await Favourite.deleteById(homeId);
  } catch (err) {
    console.log("Error while removing favourite: ", err);
  } finally {
    res.redirect("/favourites");
  }
};

exports.getHomeDetails = async (req, res, next) => {
  const homeId = req.params.homeId;
  try {
    const home = await Home.findById(homeId);
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    } else {
      res.render("store/home_detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
      });
    }
  } catch (error) {
    next(error);
  }
};
