const { Router } = require("express");
const router = Router();
const PessoasController = require("../controllers/PessoasController");

router.get("/pessoas", PessoasController.buscarAtivos);
router.get("/pessoas/todos", PessoasController.buscar);
router.get("/pessoas/:id", PessoasController.buscarPorId);
router.post("/pessoas", PessoasController.criar);
router.post("/pessoas/:id/restaura", PessoasController.restaurarPessoa);
router.post(
  "/pessoas/:idEstudante/matriculas/cancelar",
  PessoasController.desativarMatricula
);
router.put("/pessoas/:id", PessoasController.editar);
router.delete("/pessoas/:id", PessoasController.deletar);

router.get(
  "/pessoas/:estudanteId/matriculas",
  PessoasController.buscarMatriculas
);
router.get(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoasController.buscarMatriculaPorId
);
router.get(
  "/pessoas/matriculas/:idTurma/confirmadas",
  PessoasController.buscarMatriculasPorTurma
);
router.get("/pessoas/matricula/lotadas", PessoasController.buscarTurmasLotadas);
router.post(
  "/pessoas/:estudanteId/matriculas",
  PessoasController.criarMatricula
);

router.post(
  "/pessoas/:estudanteId/matriculas/:matriculaId/restaura",
  PessoasController.restaurarMatricula
);

router.put(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoasController.editarMatricula
);

router.delete(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoasController.deletarMatricula
);

module.exports = router;
