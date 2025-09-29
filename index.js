const express = require("express");
const app = express();
app.use(express.json());

let pontosColeta = [];

// Endpoint 1: Registrar ponto de coleta
app.post("/pontos-coleta", (req, res) => {
  const { endereco, material, quantidade } = req.body;
  if (!endereco || !material || !quantidade) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }
  const novoPonto = { endereco, material, quantidade };
  pontosColeta.push(novoPonto);
  return res.status(201).json({
    mensagem: "Ponto de coleta registrado com sucesso!",
    dados: novoPonto
  });
});

// Endpoint 2: Listar pontos para catadores
app.get("/catadores/notificacoes", (req, res) => {
  return res.status(200).json(pontosColeta);
});

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
