const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const homeDataPath = path.join(rootDir, 'data', 'homes.json');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((homes) => {
      homes.push(this);

      fs.writeFile(homeDataPath, JSON.stringify(homes), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
};