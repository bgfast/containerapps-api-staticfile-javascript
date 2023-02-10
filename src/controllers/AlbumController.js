var Albums = require("../models/Album");


//router.get("/orthopedicSurgeries", orderController.orthopedic_surgeries);
//router.get("/orthopedicSurgeriesFromRedis", orderController.orthopedic_surgeries_from_redis);
//router.get("/albums", orderController.albums);
//router.get("/albumsFromRedis", orderController.albums_from_redis);

exports.albums = async function (req, res) {
  const albums = await Albums.getAlbums();
  console.log("Retrieved Albums");
  res.json(albums);
};

exports.albums_from_redis = async function (req, res) {
  const albums = await Albums.getAlbumsFromRedis();
  console.log("Retrieved Albums from Redis");
  res.json(albums);
};

exports.orthopedic_surgeries_from_redis = async function (req, res) {
  const albums = await Albums.getOrthopedicSurgeriesFromRedis();
  // https://learn.microsoft.com/en-gb/azure/azure-monitor/overview
  //
  // log to Azure log analytics
  //logAnalytics.logToAnalytics("Retrieved orthopedic surgeries from Redis");
  // include azure log analytics
  //const logAnalytics = require("../utils/logAnalytics");

  var redisresult = testCache();
  console.log("Retrieved orthopedic surgeries from Redis "+redisresult);
  res.json(albums);
};

exports.orthopedic_surgeries = async function (req, res) {
  const albums = await Albums.getOrthopedicSurgeries();
  console.log("Retrieved orthopedic surgeries");
  res.json(albums);
};

var redis = require("redis");

async function testCache() {

    // Connect to the Azure Cache for Redis over the TLS port using the key.
    var cacheHostName = process.env.rediscachehostname;
    var cachePassword = process.env.rediscachekey;
    console.log("\ncachePassword ***"+cachePassword+"*** "+cachePassword.length);
    console.log("\ncacheHostName ***"+cacheHostName+"*** "+cacheHostName.length);
    try { 
        // Perform cache operations using the cache connection object...
        var cacheConnection = redis.createClient({
            // rediss for TLS
            url: "rediss://" + cacheHostName + ":6380",
            password: cachePassword,
        });
        await cacheConnection.connect();
        console.log("\nCache command: PING");
        console.log("Cache response : " + await cacheConnection.ping());
        // Simple PING command
        console.log("\nCache command: PING");
        console.log("Cache response : " + await cacheConnection.ping());
        // Simple get and put of integral data types into the cache
        console.log("\nCache command: GET Message");
        console.log("Cache response : " + await cacheConnection.get("Message"));

        console.log("\nCache command: SET Message");
        console.log("Cache response : " + await cacheConnection.set("Message",
            "Hello! The cache is working again from Node.js!"));

        // Demonstrate "SET Message" executed as expected...
        console.log("\nCache command: GET Message");
        console.log("Cache response : " + await cacheConnection.get("Message"));

        // Get the client list, useful to see if connection list is growing...
        console.log("\nCache command: CLIENT LIST");
        console.log("Cache response : " + await cacheConnection.sendCommand(["CLIENT", "LIST"]));

        console.log("\nDone");
        process.exit();
    }
    catch (err) {
        console.log("Error connecting to cache: " + err);
    }

    return "result from redis function"


}


