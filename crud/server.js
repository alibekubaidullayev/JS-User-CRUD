const http = require("http");
const routeHandler = require("./routes/router");

const PORT = 3000;

const server = http.createServer(routeHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
