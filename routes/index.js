const pessoasRouter = require("./pessoasRouter");
const niveisRouter = require("./niveisRouter");
const turmasRouter = require("./turmasRouter");

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(pessoasRouter, niveisRouter, turmasRouter);
};
