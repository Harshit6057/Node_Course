const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    ...user,
    id: user._id.toString(),
  };
};

module.exports = class User {
  constructor({ firstName, lastName, email, password, userType, _id }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userType = userType;
    if (_id) {
      this._id = _id instanceof ObjectId ? _id : new ObjectId(String(_id));
    }
  }

  save() {
    const db = getDB();

    if (this._id) {
      const updateFields = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        userType: this.userType,
      };

      return db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: updateFields });
    }

    return db
      .collection("users")
      .findOne({ email: this.email })
      .then((existingUser) => {
        if (existingUser) {
          throw new Error("User already exists with this email");
        }

        return db.collection("users").insertOne(this);
      });
  }

  static findOne(filter) {
    const db = getDB();
    return db
      .collection("users")
      .findOne(filter)
      .then(normalizeUser);
  }
};
