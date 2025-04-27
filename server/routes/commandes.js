const express = require("express");
const router = express.Router();
const commandesController = require("../controllers/commandesController");

router.post("/", commandesController.addCommande);
router.get("/", commandesController.getCommandes);
router.get("/:id", commandesController.getCommandeDetails);

module.exports = router;
