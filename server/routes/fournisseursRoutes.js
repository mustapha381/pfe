const express = require("express");
const router = express.Router();
const fournisseursController = require("../controllers/fournisseursController");

router.post("/", fournisseursController.addFournisseur);
router.get("/", fournisseursController.getFournisseurs);
router.delete("/:id", fournisseursController.deleteFournisseur);
router.put("/:id", fournisseursController.updateFournisseur);

module.exports = router;
