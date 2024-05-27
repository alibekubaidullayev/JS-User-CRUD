const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("yourdatabase.db");
const util = require("util");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
)`);

const dbAll = util.promisify(db.all.bind(db));
const dbRun = util.promisify(db.run.bind(db));

const getUsers = async () => {
  try {
    const users = await dbAll("SELECT * FROM users;", []);
    return users;
  } catch (error) {
    return { Error: error };
  }
};

const getUser = async (id) => {
  try {
    const user = await dbAll("SELECT * FROM users WHERE id=?;", [id]);
    return user;
  } catch (error) {
    return { Error: error };
  }
};

const addUser = async (user) => {
  try {
    const lastID = await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (name, age) VALUES(?, ?)",
        [user.name, user.age],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        },
      );
    });
    return { id: lastID, ...user };
  } catch (error) {
    return { Error: error };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await dbAll("SELECT * FROM users WHERE id=?;", [id]);
    if (user.length === 0) {
      return { Error: "User not found" };
    }
    await dbRun("DELETE FROM users WHERE id=?;", [id]);
    return user[0];
  } catch (error) {
    return { Error: error };
  }
};

const updateUser = async (id, user) => {
  try {
    const userKeys = Object.keys(user);
    const userValues = Object.values(user);
    const keysTemplate = userKeys.map((key) => `${key}=?`).join(", ");
    await dbRun(`UPDATE users SET ${keysTemplate} WHERE id=?;`, [
      ...userValues,
      id,
    ]);
    const updatedUser = await dbAll("SELECT * FROM users WHERE id=?;", [id]);
    return updatedUser[0];
  } catch (error) {
    return { Error: error };
  }
};

const getCurrentId = async () => {
  try {
    const result = await dbAll("SELECT MAX(id) as id FROM users;", []);
    return result[0].id;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  getCurrentId,
};
