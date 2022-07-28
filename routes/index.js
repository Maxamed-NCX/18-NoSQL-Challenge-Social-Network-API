const router = require("express").Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const api_routes = require("./api");

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use("/api", api_routes);

router.use((req, res) => {
  res.status(404).send("<h1> Error 404 Error!</h1>");
});

module.exports = router;
