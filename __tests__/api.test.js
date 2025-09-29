const request = require("supertest");
const express = require("express");

// Criando a mesma API usada no index.js
const app = express();
app.use(express.json());

let pontosColeta = [];

app.post("/pontos-coleta", (req, res) => {
  const { endereco, material, quantidade } = req.body;
  if (!endereco || !material || !quantidade) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }
  const novoPonto = { endereco, material, quantidade };
  pontosColeta.push(novoPonto);
  return res.status(201).json(novoPonto);
});

app.get("/catadores/notificacoes", (req, res) => {
  if (pontosColeta.length === 0) {
    return res.status(404).json({ error: "Nenhum ponto de coleta cadastrado." });
  }
  return res.status(200).json(pontosColeta);
});

// Testes
describe("API Plataforma Verde", () => {

  beforeEach(() => {
    pontosColeta = []; // limpa os dados antes de cada teste
  });

  it("Deve cadastrar um ponto de coleta (201)", async () => {
    const res = await request(app).post("/pontos-coleta").send({
      endereco: "Rua Padre Júlio Maria, 210 - Bom Jardim",
      material: "Papelão",
      quantidade: "8kg"
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("endereco", "Rua Padre Júlio Maria, 210 - Bom Jardim");
  });

  it("Deve retornar erro se faltar campos obrigatórios no POST (400)", async () => {
    const res = await request(app).post("/pontos-coleta").send({
      endereco: "Rua Teste"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Todos os campos são obrigatórios!");
  });

  it("Deve retornar erro se não houver pontos cadastrados no GET (404)", async () => {
    const res = await request(app).get("/catadores/notificacoes");
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe("Nenhum ponto de coleta cadastrado.");
  });

  it("Deve listar os pontos de coleta cadastrados (200)", async () => {
    // primeiro cadastra
    await request(app).post("/pontos-coleta").send({
      endereco: "Rua Guarani, 560 - Bom Jardim",
      material: "Plástico",
      quantidade: "12kg"
    });
    // depois busca
    const res = await request(app).get("/catadores/notificacoes");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

});
