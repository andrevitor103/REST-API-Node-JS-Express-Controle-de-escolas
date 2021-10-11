const database = require("../models");
const { NiveisServices } = require("../services");
const niveisService = new NiveisServices();

class NivelController {
  static async buscar(req, res) {
    try {
      const buscarTodosOsNiveis = await niveisService.buscar();
      return res.status(200).json(buscarTodosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const buscarNivel = await niveisService.buscarPorId({ id: Number(id) });
      res.status(200).json(buscarNivel);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async criar(req, res) {
    try {
      const novoNivel = req.body;
      const resultado = await niveisService.criar(novoNivel);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async editar(req, res) {
    try {
      const { id } = req.params;
      const novosDados = req.body;
      await niveisService.atualizar(novosDados, { id: Number(id) });
      const nivelAtualizado = await database.Niveis.findOne({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(nivelAtualizado);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      await niveisService.deletar({ id: Number(id) });
      res.status(204).json({ mensagem: "Deletado com sucesso" });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async restauraNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ mensagem: `${id} restaurado com sucesso...` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
