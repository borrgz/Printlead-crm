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


// =====================
// CLIENTES
// =====================

// Obtener clientes
app.get("/customers", (req, res) => {
  db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});


// Crear cliente
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


// =====================
// SEGUIMIENTOS COMERCIALES
// =====================


// Obtener seguimientos
app.get("/followups", (req, res) => {

  db.all("SELECT * FROM followups", [], (err, rows) => {

    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);

  });

});


// Crear seguimiento
app.post("/followups", (req, res) => {

  const {
    customer,
    type,
    note,
    next_action,
    status
  } = req.body;


  const sql = `
    INSERT INTO followups
    (customer, type, note, next_action, status)
    VALUES (?, ?, ?, ?, ?)
  `;


  db.run(
    sql,
    [
      customer,
      type,
      note,
      next_action,
      status
    ],
    function(err) {

      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }


      res.json({
        id: this.lastID,
        customer,
        type,
        note,
        next_action,
        status
      });

    }
  );

});


app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
