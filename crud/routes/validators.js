const data = require("../data");

const isValidUserCreate = (user) => {
  const keys = Object.keys(user);

  if (keys.length !== 2) return [null, "Must have two attributes: name, age."];
  if (!keys.includes("name")) return [null, 'No "name" attribute.'];
  if (!keys.includes("age")) return [null, 'No "age" attribute.'];

  const { name, age } = user;

  const parsedAge = Number(age);
  if (isNaN(parsedAge)) return [null, "Age must be a valid number."];

  if (typeof name !== "string" || name.trim() === "") {
    return [null, "Name must be a non-empty string."];
  }

  if (parsedAge <= 0) {
    return [null, "Age must be greater than 0."];
  }

  return [{ name, age: parsedAge }, null];
};

const isValidUserUpdate = (user) => {
  const { name, age } = user;

  if (name && (typeof name !== "string" || name.trim() === "")) {
    return [null, "Name must be a non-empty string."];
  }

  if (age !== undefined) {
    const parsedAge = Number(age);
    if (isNaN(parsedAge)) return [null, "Age must be a valid number."];
    if (parsedAge <= 0) return [null, "Age must be greater than 0."];
    return [{ ...user, age: parsedAge }, null];
  }

  return [user, null];
};

const isValidId = (id) => {
  const currentId = data.getCurrentId();

  if (id >= currentId) return [null, `No user with id ${id}`];
  if (id < 1) return [null, "ID must be greater than 0"];

  return [id, null];
};

module.exports = {
  isValidUserCreate,
  isValidUserUpdate,
  isValidId,
};
