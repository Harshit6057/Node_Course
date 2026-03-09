 exports.getAddHome = (req, res, next) =>{
  
  res.render('addHome' , {pageTitle: "Add Home to airbnb",
    currentPage: "addHome",});
 };


 const registeredHomes = [];

 exports.postAddHome = (req, res, next) =>{
  console.log('Home Registration Successful');
  console.log(req.body);
  console.log(req.body.houseName);
  registeredHomes.push({ houseName: req.body.houseName });
  console.log(registeredHomes);
  
  res.render('homeadded', {pageTitle: 'Home Added Successfully',
    currentPage: "homeAdded",
  });
 }


 exports.getHomes = (req, res, next) =>{
  console.log(registeredHomes);
  res.render("home", { registeredHomes: registeredHomes, pageTitle: 'airbnb Home' });
}

 exports.registeredHomes = registeredHomes;