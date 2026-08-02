import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [dashboard, setDashboard] = useState({
    customers: 0,
    pending_followups: 0,
    open_quotes: 0,
    active_orders: 0
  });


  const [customers, setCustomers] = useState([]);

  const [followups, setFollowups] = useState([]);


  const [customerForm, setCustomerForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: ""
  });


  const [followupForm, setFollowupForm] = useState({
    customer: "",
    type: "Visita",
    note: "",
    next_action: "",
    status: "Pendiente"
  });



  useEffect(() => {

    loadDashboard();

    loadCustomers();

    loadFollowups();

  }, []);



  const loadDashboard = () => {

    fetch("http://localhost:3000/dashboard")
      .then(res => res.json())
      .then(data => setDashboard(data));

  };



  const loadCustomers = () => {

    fetch("http://localhost:3000/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));

  };



  const loadFollowups = () => {

    fetch("http://localhost:3000/followups")
      .then(res => res.json())
      .then(data => setFollowups(data));

  };



  const handleCustomerChange = (e) => {

    setCustomerForm({

      ...customerForm,

      [e.target.name]: e.target.value

    });

  };



  const handleFollowupChange = (e) => {

    setFollowupForm({

      ...followupForm,

      [e.target.name]: e.target.value

    });

  };



  const addCustomer = () => {

    fetch("http://localhost:3000/customers", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(customerForm)

    })
    .then(res => res.json())
    .then(() => {

      loadCustomers();

      loadDashboard();

    });

  };



  const addFollowup = () => {

    fetch("http://localhost:3000/followups", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(followupForm)

    })
    .then(res => res.json())
    .then(() => {

      loadFollowups();

      loadDashboard();

    });

  };



  return (

    <div className="container">


      <h1>PrintLead CRM 🚀</h1>



      <div className="card">

        <h2>Dashboard</h2>

        <p>👥 Clientes: {dashboard.customers}</p>

        <p>📞 Seguimientos pendientes: {dashboard.pending_followups}</p>

        <p>💰 Presupuestos abiertos: {dashboard.open_quotes}</p>

        <p>📦 Trabajos activos: {dashboard.active_orders}</p>

      </div>





      <div className="card">

        <h2>Añadir cliente</h2>


        <input
          name="company"
          placeholder="Empresa"
          onChange={handleCustomerChange}
        />


        <input
          name="name"
          placeholder="Contacto"
          onChange={handleCustomerChange}
        />


        <input
          name="phone"
          placeholder="Teléfono"
          onChange={handleCustomerChange}
        />


        <input
          name="email"
          placeholder="Email"
          onChange={handleCustomerChange}
        />


        <button onClick={addCustomer}>
          Guardar cliente
        </button>


      </div>





      <div className="card">

        <h2>Nuevo seguimiento comercial</h2>


        <input
          name="customer"
          placeholder="Cliente"
          onChange={handleFollowupChange}
        />


        <select
          name="type"
          onChange={handleFollowupChange}
        >

          <option>Visita</option>
          <option>Llamada</option>
          <option>Email</option>
          <option>WhatsApp</option>

        </select>



        <input
          name="note"
          placeholder="Notas"
          onChange={handleFollowupChange}
        />



        <input
          name="next_action"
          placeholder="Próximo paso"
          onChange={handleFollowupChange}
        />



        <button onClick={addFollowup}>
          Guardar seguimiento
        </button>


      </div>





      <h2>Historial comercial</h2>


      {
        followups.map(item => (

          <div className="card" key={item.id}>

            <strong>{item.customer}</strong>

            <p>{item.type}</p>

            <p>{item.note}</p>

            <p>
              Próximo paso: {item.next_action}
            </p>

          </div>

        ))
      }


    </div>

  );

}


export default App;
