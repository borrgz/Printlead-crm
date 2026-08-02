const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "PrintLead CRM API funcionando 🚀"
  });
});

let customers = [];

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.post("/customers", (req, res) => {
  const customer = {
    id: customers.length + 1,
    name: req.body.name,
    company: req.body.company,
    phone: req.body.phone,
    email: req.body.email
  };

  customers.push(customer);

  res.json(customer);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
