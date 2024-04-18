const router = require("express").Router();
const controllers = require("../controllers");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route GET POST PUT DELETE /public-route
 * @group public Routes
 * @returns {object} 200 - The public content
 * @returns {Error}  500 - An error occurred
 */

router.post("/inscription", controllers.register.register);
router.post("/login", controllers.login.login);
router.post(
    "/client/reclamation",
    upload.single("voiceRecording"),
    controllers.createReclamation.postRequest
);

router.get("/reclamation/:userId/history", controllers.history.getHistory);
router.get("/user/:userId", controllers.getUserInfos.userData);

/**
 * @route GET POST PUT DELETE /private-route
 * @group Private Routes
 * @returns {object} 200 - The public content
 * @returns {Error}  500 - An error occurred
 */

router.get(
    "/admin/reclamation/history",
    controllers.getAllReaclamation.getReaclamation
);
router.get("/admin/client", controllers.getAllUsers.getAllUsers);
router.post(
    "/admin/reclamation/:userId/confirmation",
    controllers.confirmation.reclamationConfirmation
);
router.get("/admin/candidat/list", controllers.getAlldataList.getAllCandidates);
router.get(
    "/admin/secretaire/list",
    controllers.getAlldataList.getAllSecretaires
);
router.get("/admin/moniteur/list", controllers.getAlldataList.getAllMoniteurs);

router.delete("/admin/user/delete/:userId", controllers.delete.deleteUser);

router.put(
    "/admin/user/updateUserData/:userId",
    controllers.updateUserData.update
);

router.post("/admin/user/create", controllers.addUser.add);

module.exports = router;
