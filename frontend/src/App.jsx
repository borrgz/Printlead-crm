import React, { useEffect, useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addCustomer = () => {
    fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((newCustomer) => {
        setCustomers([...customers, newCustomer]);

        setForm({
          name: "",
          company: "",
          phone: "",
          email: ""
        });
      });
  };

  return (
    <div>
      <h1>PrintLead CRM</h1>

      <p>
        Gestión de clientes para imprentas y empresas de rotulación.
      </p>

      <h2>Añadir cliente</h2>

      <input
        name="company"
        placeholder="Empresa"
        value={form.company}
        onChange={handleChange}
      />

      <input
        name="name"
        placeholder="Persona de contacto"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <button onClick={addCustomer}>
        Guardar cliente
      </button>

      <h2>Clientes</h2>

      {customers.map((customer) => (
        <div key={customer.id}>
          <strong>{customer.company}</strong>
          <p>{customer.name}</p>
          <p>{customer.phone}</p>
          <p>{customer.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
