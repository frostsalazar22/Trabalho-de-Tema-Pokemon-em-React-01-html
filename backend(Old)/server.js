const express = require("express");
const dotenv = require("dotenv");
const { authRoutes } = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware para JSON
app.use("/api/auth", authRoutes); // Rotas de autenticação

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
