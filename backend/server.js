import express from "express";
import cors from "cors";
import transactionsRoutes from "./routes/transactions.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionsRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
