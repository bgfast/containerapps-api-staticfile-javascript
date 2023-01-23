var express = require("express");
var router = express.Router();
const orderController = require("../controllers/AlbumController");

// Root/Index Routes
router.get("/", function (req, res, next) {
  res.json({
    message: "Call the /albums route to retrieve a list of albums",
    message: "Call the /albumsFromRedis route to retrieve a list of albums from the Redis cache",
    message: "Call the /orthopedicSurgeries route to retrieve a list of orthopedicSurgeries",
    message: "Call the /orthopedicSurgeriesFromRedis route to retrieve a list of orthopedicSurgeries from the Redis cache",
  });
});

router.get("/orthopedicSurgeries", orderController.index);
router.get("/orthopedicSurgeriesFromRedis", orderController.index);
router.get("/albums", orderController.index);
router.get("/albumsFromRedis", orderController.index);

module.exports = router;
