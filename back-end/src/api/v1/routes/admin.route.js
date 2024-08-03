const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const controller = require("../controllers/admin.controller");
const authenticateToken = require("../../../middlewares/authenticate");

router.get("/users/auth/check-token", authenticateToken, userController.checkToken);
router.get("/users/auth/refresh-token", authenticateToken, userController.releaseAccessToken);
router.post("/users/auth/login", userController.userLogin);
router.get("/users/auth/logout", authenticateToken, userController.userLogout);
router.get("/admin/dashboard", controller.getDashboard);
router.post("/admin/create-movie", controller.addMovie);
router.delete("/admin/delete/:movieId", controller.deleteMovie);
router.get("/admin/edit/:movieId", controller.editMoviePage);
router.put("/admin/edit/:movieId/upload", controller.handleEditMovie);
router.get("/admin/users", controller.getUsers);
router.patch("/admin/users/lock", controller.lockUser);
router.patch("/admin/users/unlock", controller.unlockUser);
router.post("/admin/report/send", controller.receiveReport);
router.get("/admin/all-report", controller.getAllReport);

module.exports = router;