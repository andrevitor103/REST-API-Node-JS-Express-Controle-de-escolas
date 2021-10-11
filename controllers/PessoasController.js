const database = require("../models");
const sequelize = require("sequelize");

const { PessoasServices } = require("../services");
const pessoasService = new PessoasServices();

class PessoasController {
  static async buscarAtivos(req, res) {
    try {
      const buscarTodasAsPessoas = await pessoasService.buscar();
      return res.status(200).json(buscarTodasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async buscar(req, res) {
    try {
      const buscarTodasAsPessoas = await database.Pessoas.scope([
        "todos",
      ]).findAll();
      return res.status(200).json(buscarTodasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const buscarPessoa = await pessoasService.buscarPorId({
        id: Number(id),
      });
      res.status(200).json(buscarPessoa);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async criar(req, res) {
    try {
      const novaPessoa = req.body;
      const resultado = await pessoasService.criar(novaPessoa);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async editar(req, res) {
    try {
      const { id } = req.params;
      const novosDados = req.body;
      await pessoasService.atualizar(novosDados, { id: Number(id) });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(pessoaAtualizada);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      await pessoasService.deletar({ id: Number(id) });
      res.status(204).json({ mensagem: "Deletado com sucesso" });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async restaurarPessoa(req, res) {
    try {
      const { id } = req.params;
      await database.Pessoas.restore({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ mensagem: `${id} restaurado com sucesso...` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async desativarMatricula(req, res) {
    try {
      const { idEstudante } = req.params;
      await pessoasService.desativarPessoaEMatriculas(idEstudante);
      return res.status(200).json({
        message: `Matriculas referente ao estudante ${idEstudante} canceladas`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarMatriculas(req, res) {
    try {
      const { estudanteId } = req.params;
      const pessoa = await pessoasService.buscarPorId({
        id: Number(estudanteId),
      });
      const buscarMatriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(buscarMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarMatriculaPorId(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const buscarMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(buscarMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarMatriculasPorTurma(req, res) {
    try {
      const { idTurma } = req.params;
      const matriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(idTurma),
          status: "confirmado",
        },
        limit: 1,
        order: [["estudante_id", "DESC"]],
      });
      return res.status(200).json(matriculas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarTurmasLotadas(req, res) {
    try {
      const lotacaoTurma = 2;
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attrubutes: ["turma_id"],
        group: ["turma_id"],
        having: sequelize.literal(`count(turma_id) > ${lotacaoTurma}`),
      });
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarMatricula(req, res) {
    try {
      const { estudanteId } = req.params;
      const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
      const resultado = await database.Matriculas.create(novaMatricula);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async editarMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const novosDados = req.body;
      await database.Matriculas.update(novosDados, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
        },
      });
      res.status(200).json(matriculaAtualizada);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async deletarMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      res.status(204).json({ mensagem: "Deletado com sucesso" });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  static async restaurarMatricula(req, res) {
    try {
      const { matriculaId, estudanteId } = req.params;

      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      res.status(200).json(`${matriculaId} restaurado com sucesso...`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = PessoasController;
