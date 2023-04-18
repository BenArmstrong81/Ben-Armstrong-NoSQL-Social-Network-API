//--------Required express package and paths:
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("🚫 Wrong Route! 404 Not Found 🚫");
});

//--------Exports Routes:
module.exports = router;