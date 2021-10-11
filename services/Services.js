const database = require("../models");
class Services {
  constructor(nomeInstancia) {
    this.nomeInstancia = nomeInstancia;
  }

  async buscar() {
    return database[this.nomeInstancia].findAll();
  }

  async buscarPorId(where = {}) {
    return database[this.nomeInstancia].findOne({ where: { ...where } });
  }

  async criar(dados) {
    return database[this.nomeInstancia].create(dados);
  }

  async atualizar(dadosAtualizar, where) {
    return database[this.nomeInstancia].update(dadosAtualizar, {
      where: { ...where },
    });
  }
  async deletar(where) {
    return database[this.nomeInstancia].destroy({ where: { ...where } });
  }
}

module.exports = Services;
