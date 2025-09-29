# Plataforma Verde  

## Objetivo do Projeto  
A Plataforma Verde é uma API desenvolvida para simular um sistema de cadastro de pontos de coleta de materiais recicláveis no bairro **Bom Jardim (Fortaleza-CE)**.  
Ela tem como objetivo apoiar a organização de catadores e incentivar a coleta seletiva, contribuindo para os Objetivos de Desenvolvimento Sustentável (ODS).  

---

## Descrição da Solução  
O sistema foi construído em **Node.js com Express** e disponibiliza endpoints para:  
- **Cadastrar pontos de coleta** (`POST /pontos-coleta`)  
- **Listar notificações/pontos cadastrados** (`GET /catadores/notificacoes`)  

Os testes foram implementados com **Jest** e **Supertest**.  

---

## Arquitetura do Sistema  
1. O **usuário** envia uma requisição (pelo **Postman** ou pelo **navegador**).  
2. Essa requisição chega ao **servidor Node.js (Express)**.  
3. O servidor redireciona para a **rota correta**:  
   - `POST /pontos-coleta` → cadastra um ponto de coleta.  
   - `GET /catadores/notificacoes` → lista todos os pontos cadastrados.  
4. Os dados são guardados **em memória** (variável no código, simulando um banco de dados).  

---

##  Rotas da API  

###  POST `/pontos-coleta`  
**Descrição:** cadastra um novo ponto de coleta.  

**Body (JSON):**  
```json
{
  "endereco": "Rua Padre Júlio Maria, 210 - Bom Jardim",
  "material": "Papelão",
  "quantidade": "8kg"
}
```

**Resposta esperada (201 Created):**  
```json
{
  "message": "Ponto de coleta cadastrado com sucesso!"
}
```

---

###  GET `/catadores/notificacoes`  
**Descrição:** lista todos os pontos de coleta cadastrados.  

**Exemplo de resposta (200 OK):**  
```json
[
  {
    "endereco": "Rua Padre Júlio Maria, 210 - Bom Jardim",
    "material": "Papelão",
    "quantidade": "8kg"
  },
  {
    "endereco": "Rua Guarani, 560 - Bom Jardim",
    "material": "Plástico",
    "quantidade": "12kg"
  },
  {
    "endereco": "Avenida Osório de Paiva, 1320 - Bom Jardim",
    "material": "Vidro",
    "quantidade": "20kg"
  }
]
```

---

##  ODS Relacionados  
- **ODS 11**: Cidades e comunidades sustentáveis.  
- **ODS 12**: Consumo e produção responsáveis.  
- **ODS 13**: Ação contra a mudança global do clima.  

---

##  Como Executar o Projeto  
1. Instalar dependências:  
```bash
npm install
```  

2. Executar os testes automatizados:  
```bash
npm test
```  

3. Iniciar o servidor:  
```bash
node index.js
```  

4. Usar o Postman ou navegador para acessar as rotas:  
- **POST** `http://localhost:3000/pontos-coleta`  
- **GET** `http://localhost:3000/catadores/notificacoes`  
