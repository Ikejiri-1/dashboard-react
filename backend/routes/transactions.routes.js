import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router();

/* ESSA PARTE É O QUE SUBSTITUI O __dirname DO NODE ANTIGO */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* caminho do banco */
const DB_PATH = __dirname + "/../database.json";

// função para ler o banco
function readDB() {
  const data = fs.readFileSync(DB_PATH);
  return JSON.parse(data);
}

// função para salvar
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

/* LISTAR TRANSAÇÕES */
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.transactions);
});

/* CRIAR TRANSAÇÃO */
router.post("/", (req, res) => {
  const db = readDB();

  const newTransaction = {
    id: Date.now(),
    type: req.body.type,
    customer: req.body.customer,
    value: req.body.value,
    percentage: req.body.percentage || 0,
    date: req.body.date,
    paymentDate: null,
    status: "pending",
  };

  db.transactions.push(newTransaction);
  writeDB(db);

  res.status(201).json(newTransaction);
});

/* MARCAR COMO PAGO */
router.patch("/:id/pay", (req, res) => {
  const db = readDB();

  const tx = db.transactions.find((t) => t.id == req.params.id);

  if (!tx) return res.status(404).json({ error: "Transação não encontrada" });

  tx.status = "paid";
  tx.paymentDate = new Date().toISOString();

  writeDB(db);

  res.json(tx);
});

/* DELETAR */
router.delete("/:id", (req, res) => {
  const db = readDB();

  db.transactions = db.transactions.filter((t) => t.id != req.params.id);

  writeDB(db);

  res.json({ message: "Removido" });
});

export default router;
