const express = require("express");
const router = express.Router();
const magicHandsController = require("../controllers/magicHandsController");
const { matchRoutes } = require("react-router-dom");

// IMPORT CHECK AUTH
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/", magicHandsController.showHome);
router.get("/services", magicHandsController.showServices);

router.get("/client", magicHandsController.showClient);
router.post("/client/insert", magicHandsController.insertClient)

router.get("/agendar", magicHandsController.showAgendar)
 router.post("/agenda/insert", magicHandsController.insertAgenda)

router.get("/consultar", magicHandsController.showConsultar);

router.get("/contato", magicHandsController.showContato);

router.post('/sendmessage', magicHandsController.sendMessage)
router.get('/homestaff', magicHandsController.showHomeStaff)

router.get('/agenda/editar', checkAuth, magicHandsController.updatadeAgenda)
router.post('/agenda/remover',checkAuth, magicHandsController.removeAgenda)

module.exports = router;