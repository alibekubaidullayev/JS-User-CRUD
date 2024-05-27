const data = require("../../data");

module.exports = async (req, res) => {
  try {
    const usersList = await data.getUsers();
    res.writeHead(200);
    res.end(JSON.stringify(usersList));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};
