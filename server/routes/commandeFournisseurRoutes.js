const express = require("express");
const router = express.Router();
const commandeFournisseurController = require("../controllers/commandeFournisseurController");

router.post("/", commandeFournisseurController.addCommande);
router.get("/", commandeFournisseurController.getCommandes);
router.get("/:id", commandeFournisseurController.getCommandeById);
router.put("/:id", commandeFournisseurController.updateCommande);
router.delete("/:id", commandeFournisseurController.deleteCommande);

module.exports = router;

