const Services = require("./Services");
const database = require("../models");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  async desativarPessoaEMatriculas(id) {
    return database.sequelize.transaction(async (transacao) => {
      await super.atualizar(
        { ativo: false },
        { id: Number(id) },
        { transaction: transacao }
      );
      await this.matriculas.atualizar(
        { status: "cancelado" },
        { estudante_id: Number(id) },
        {
          transaction: transacao,
        }
      );
    });
  }
}

module.exports = PessoasServices;
