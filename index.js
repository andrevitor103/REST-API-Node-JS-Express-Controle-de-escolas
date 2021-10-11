const express = require("express");
const app = express();
const rotas = require("./routes");
const port = 3000;

rotas(app, express);

app.listen(port, (erro) => {
  if (erro) {
    console.log("Erro ao subir servidor");
    return;
  }
  console.log("Subiu que uma bala...");
});
