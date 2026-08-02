const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "PrintLead CRM API funcionando 🚀"
  });
});

// Obtener todos los clientes
app.get("/customers", (req, res) => {
  db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

// Crear un cliente nuevo
app.post("/customers", (req, res) => {
  const { name, company, phone, email } = req.body;

  const sql = `
    INSERT INTO customers (name, company, phone, email)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [name, company, phone, email], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      id: this.lastID,
      name,
      company,
      phone,
      email
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
