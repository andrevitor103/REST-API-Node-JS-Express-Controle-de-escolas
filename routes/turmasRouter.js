const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();
router
  .get("/turmas", TurmaController.buscar)
  .get("/turmas/:id", TurmaController.buscarPorId)
  .post("/turmas", TurmaController.criar)
  .put("/turmas/:id", TurmaController.editar)
  .delete("/turmas/:id", TurmaController.deletar)
  .post("/turmas/:id/restaura", TurmaController.restauraTurma);
module.exports = router;
