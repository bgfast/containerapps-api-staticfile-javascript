var express = require("express");
var router = express.Router();
const orderController = require("../controllers/AlbumController");

// Root/Index Routes
router.get("/", function (req, res, next) {
  res.json({
    message1: "Call the /albums route to retrieve a list of albums",
    message2: "Call the /albumsFromRedis route to retrieve a list of albums from the Redis cache",
    message3: "Call the /orthopedicSurgeries route to retrieve a list of orthopedicSurgeries",
    message4: "Call the /orthopedicSurgeriesFromRedis route to retrieve a list of orthopedicSurgeries from the Redis cache"
  });
});

router.get("/orthopedicSurgeries", orderController.orthopedic_surgeries);
router.get("/orthopedicSurgeriesFromRedis", orderController.orthopedic_surgeries_from_redis);
router.get("/albums", orderController.albums);
router.get("/albumsFromRedis", orderController.albums_from_redis);

module.exports = router;


// redis research
// https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-nodejs-get-started
// https://github.com/Azure-Samples/azure-cache-redis-samples/tree/main/quickstart/nodejs

// https://learn.microsoft.com/en-us/azure/architecture/best-practices/index-best-practices


