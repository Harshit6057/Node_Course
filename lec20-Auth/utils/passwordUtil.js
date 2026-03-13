const crypto = require("crypto");

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

const scryptAsync = (value, salt) =>
  new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(derivedKey);
    });
  });

exports.hashPassword = async (password) => {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = await scryptAsync(password, salt);
  return `${salt}:${derivedKey.toString("hex")}`;
};

exports.comparePassword = async (password, storedPassword) => {
  if (!storedPassword || !storedPassword.includes(":")) {
    return false;
  }

  const [salt, hashedPassword] = storedPassword.split(":");
  const derivedKey = await scryptAsync(password, salt);
  const hashedBuffer = Buffer.from(hashedPassword, "hex");

  if (hashedBuffer.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(hashedBuffer, derivedKey);
};
