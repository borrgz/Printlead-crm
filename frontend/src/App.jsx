import React, { useEffect, useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error));
  }, []);

  const addCustomer = () => {
    const customer = {
      name: "Nuevo cliente",
      company: "Empresa ejemplo",
      phone: "600000000",
      email: "cliente@email.com"
    };

    fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then((response) => response.json())
      .then((newCustomer) => {
        setCustomers([...customers, newCustomer]);
      });
  };

  return (
    <div>
      <h1>PrintLead CRM</h1>

      <p>
        Gestión de clientes para imprentas y empresas de rotulación.
      </p>

      <button onClick={addCustomer}>
        Añadir cliente
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
