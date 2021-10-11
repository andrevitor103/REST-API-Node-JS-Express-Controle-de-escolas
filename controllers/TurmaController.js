const database = require("../models");
const sequelize = require("sequelize");
const { TurmasServices } = require("../services");
const turmasServices = new TurmasServices();
const op = sequelize.Op;

class TurmaController {
  static async buscar(req, res) {
    try {
      const { data_inicio, data_final } = req.query;
      const where = {};

      data_inicio || data_final ? (where.data_inicio = {}) : null;
      data_inicio ? (where.data_inicio[op.gte] = data_inicio) : null;
      data_final ? (where.data_inicio[op.lte] = data_final) : null;
      const buscarTodasAsTurmas = await turmasServices.buscar(where);
      return res.status(200).json(buscarTodasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const buscarTurma = await turmasServices.buscarPorId({ id: Number(id) });
      res.status(200).json(buscarTurma);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async criar(req, res) {
    try {
      const novaTurma = req.body;
      const resultado = await turmasServices.criar(novaTurma);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async editar(req, res) {
    try {
      const { id } = req.params;
      const novosDados = req.body;
      await turmasServices.atualizar(novosDados, { id: Number(id) });
      const turmaAtualizada = await database.Turmas.findOne({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(turmaAtualizada);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      await turmasServices.deletar({ id: Number(id) });
      res.status(204).json({ mensagem: "Deletado com sucesso" });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ mensagem: `${id} restaurado com sucesso...` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
