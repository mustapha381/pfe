const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");

router.post("/", clientsController.addClient);
router.get("/", clientsController.getClients);
router.delete("/:id", clientsController.deleteClient);
router.put("/:id", clientsController.updateClient); // optionnel si tu veux la modif aussi

module.exports = router;
