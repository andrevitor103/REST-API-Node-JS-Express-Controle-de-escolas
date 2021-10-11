const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();
router
  .get("/niveis", NivelController.buscar)
  .get("/niveis/:id", NivelController.buscarPorId)
  .post("/niveis", NivelController.criar)
  .put("/niveis/:id", NivelController.editar)
  .delete("/niveis/:id", NivelController.deletar)
  .post("/niveis/:id/restaura", NivelController.restauraNivel);
module.exports = router;
