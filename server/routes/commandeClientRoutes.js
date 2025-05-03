const express = require("express");
const router = express.Router();
const commandeClientController = require("../controllers/commandeClientController");

router.post("/", commandeClientController.addCommande);
router.get("/", commandeClientController.getCommandes);
router.delete("/:id", commandeClientController.deleteCommande);

module.exports = router;
