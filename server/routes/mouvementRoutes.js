const express = require("express");
const router = express.Router();
const mouvementController = require("../controllers/mouvementController");

router.get("/", mouvementController.getMouvements);
router.post("/", mouvementController.addMouvement);

module.exports = router;
