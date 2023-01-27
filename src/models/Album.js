
const orthopedicprocedures = [
  {
    id:1,
    name : "Knee arthroscopy and meniscectomy"
  },
  {
    id:2,
    name : "Shoulder arthroscopy and decompression"
  },
  {
    id:3,
    name : "Carpal tunnel release"
  },
  {
    id:4,
    name : "Knee arthroscopy and chondroplasty"
  },
  {
    id:5,
    name : "Removal of support implant"
  },
  {
    id:6,
    name : "Knee arthroscopy and anterior cruciate ligament reconstruction"
  },
  {
    id:7,
    name : "Knee replacement"
  },
  {
    id:8,
    name : "Repair of femoral neck fracture"
  },
  {
    id:9,
    name : "Repair of trochanteric fracture"
  },
  {
    id:10,
    name : "Debridement of skin/muscle/bone/ fracture"
  },
  {
    id:11,
    name : "Knee arthroscopy repair of both menisci"
  },
  {
    id:12,
    name : "Hip replacement"
  },
  {
    id:13,
    name : "Shoulder arthroscopy/distal clavicle excision"
  },
  {
    id:14,
    name : "Repair of rotator cuff tendon"
  },
  {
    id:15,
    name : "Repair fracture of radius (bone)/ulna"
  },
  {
    id:16,
    name : "Laminectomy"
  },
  {
    id:17,
    name : "Repair of ankle fracture (bimalleolar type)"
  },
  {
    id:18,
    name : "Shoulder arthroscopy and debridement"
  },
  {
    id:19,
    name : "Lumbar spinal fusion"
  },
  {
    id:20,
    name : "Repair fracture of the distal part of radius"
  },
  {
    id:21,
    name : "Low back intervertebral disc surgery"
  },
  {
    id:22,
    name : "Incise finger tendon sheath"
  },
  {
    id:23,
    name : "Repair of ankle fracture (fibula)"
  },
  {
    id:24,
    name : "Repair of femoral shaft fracture"
  },
  {
    id:25,
    name : "Repair of trochanteric fracture"
  }
];

const albums = [
  {
    id: 1,
    title: "You, Me and an App ID - Javascript",
    artist: "Daprize",
    price: 56.99,
    image_url: "https://aka.ms/albums-daprlogo",
  },
  {
    id: 2,
    title: "Seven Revision Army",
    artist: "The Blue-Green Stripes",
    price: 17.99,
    image_url: "https://aka.ms/albums-containerappslogo",
  },
  {
    id: 3,
    title: "Scale It Up",
    artist: "KEDA Club",
    price: 39.99,
    image_url: "https://aka.ms/albums-kedalogo",
  },
  {
    id: 4,
    title: "Lost in Translation",
    artist: "MegaDNS",
    price: 39.99,
    image_url: "https://aka.ms/albums-envoylogo",
  },
  {
    id: 5,
    title: "Lock Down your Love",
    artist: "V is for VNET",
    price: 39.99,
    image_url: "https://aka.ms/albums-vnetlogo",
  },
  {
    id: 6,
    title: "Sweet Container O' Mine",
    artist: "Guns N Probeses",
    price: 39.99,
    image_url: "https://aka.ms/albums-containerappslogo",
  },
];

const getOrthopedicSurgeriesFromRedis = async function () {
  return Promise.resolve(orthopedicprocedures);
};

const getOrthopedicSurgeries = async function () {
  return Promise.resolve(orthopedicprocedures);
};

const getAlbumsFromRedis = async function () {
  return Promise.resolve(albums);
};

const getAlbums = async function () {
  return Promise.resolve(albums);
};

exports.getOrthopedicSurgeries = getOrthopedicSurgeries;
exports.getOrthopedicSurgeriesFromRedis = getOrthopedicSurgeriesFromRedis;

exports.getAlbums = getAlbums;
exports.getAlbumsFromRedis = getAlbumsFromRedis;
