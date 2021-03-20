const express = require("express");
const MusicController = require("../controllers/MusicController");
const RouteGuard = require("../security/RouteGuard");

const routes = express.Router();

routes.get(
  "/musics",
  RouteGuard.checkAuthorization,
  MusicController.getAllMusics
);
routes.post("/musics", RouteGuard.checkAuthorization, MusicController.save);
routes.put("/musics/:id", RouteGuard.checkAuthorization, MusicController.edit);
routes.delete(
  "/musics/:id",
  RouteGuard.checkAuthorization,
  MusicController.delete
);
routes.get(
  "/musics/deleted",
  RouteGuard.checkAuthorization,
  MusicController.getAllDeletedMusics
);
routes.get(
  "/musics/deleted/count",
  RouteGuard.checkAuthorization,
  MusicController.getCountDeletedMusics
);
routes.post(
  "/musics/recover",
  RouteGuard.checkAuthorization,
  MusicController.recoverDeletedMusics
);

module.exports = routes;
