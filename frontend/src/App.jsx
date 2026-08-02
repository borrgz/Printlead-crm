import React, { useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);

  const addCustomer = () => {
    const newCustomer = {
      name: "Nuevo cliente",
      company: "Empresa ejemplo",
      phone: "600000000",
      email: "cliente@email.com"
    };

    setCustomers([...customers, newCustomer]);
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

      {customers.map((customer, index) => (
        <div key={index}>
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
