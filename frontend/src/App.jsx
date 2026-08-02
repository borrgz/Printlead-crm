import React, { useEffect, useState } from "react";
import "./App.css";

function App() {


  const [dashboard, setDashboard] = useState({
    customers: 0,
    pending_followups: 0,
    open_quotes: 0,
    active_orders: 0
  });


  const [followups, setFollowups] = useState([]);

  const [quotes, setQuotes] = useState([]);



  const [quoteForm, setQuoteForm] = useState({

    customer: "",
    product: "",
    description: "",
    amount: "",
    status: "Pendiente",
    date: ""

  });



  useEffect(()=>{

    loadDashboard();
    loadFollowups();
    loadQuotes();

  },[]);



  const loadDashboard = ()=>{

    fetch("http://localhost:3000/dashboard")
    .then(res=>res.json())
    .then(data=>setDashboard(data));

  };



  const loadFollowups = ()=>{

    fetch("http://localhost:3000/followups")
    .then(res=>res.json())
    .then(data=>setFollowups(data));

  };



  const loadQuotes = ()=>{

    fetch("http://localhost:3000/quotes")
    .then(res=>res.json())
    .then(data=>setQuotes(data));

  };



  const handleQuoteChange=(e)=>{

    setQuoteForm({

      ...quoteForm,

      [e.target.name]: e.target.value

    });

  };



  const addQuote=()=>{


    fetch(
      "http://localhost:3000/quotes",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(quoteForm)

      }

    )

    .then(res=>res.json())

    .then(()=>{

      loadQuotes();
      loadDashboard();

    });


  };




return (

<div className="container">


<h1>PrintLead CRM 🚀</h1>



<div className="dashboard">


<div className="stat">

<h3>{dashboard.customers}</h3>

<p>👥 Clientes</p>

</div>



<div className="stat">

<h3>{dashboard.pending_followups}</h3>

<p>📞 Seguimientos</p>

</div>



<div className="stat">

<h3>{dashboard.open_quotes}</h3>

<p>💰 Presupuestos</p>

</div>



<div className="stat">

<h3>{dashboard.active_orders}</h3>

<p>📦 Pedidos</p>

</div>



</div>





<div className="card">

<h2>Nuevo presupuesto</h2>



<input

name="customer"

placeholder="Cliente"

onChange={handleQuoteChange}

/>



<input

name="product"

placeholder="Producto (rótulo, vinilo, flyers...)"

onChange={handleQuoteChange}

/>



<input

name="description"

placeholder="Descripción del trabajo"

onChange={handleQuoteChange}

/>



<input

name="amount"

placeholder="Importe"

onChange={handleQuoteChange}

/>



<input

name="date"

placeholder="Fecha"

onChange={handleQuoteChange}

/>



<button onClick={addQuote}>

Guardar presupuesto

</button>



</div>





<h2>Presupuestos</h2>



{

quotes.map((quote)=>(

<div className="card" key={quote.id}>


<strong>

{quote.customer}

</strong>


<p>

{quote.product}

</p>


<p>

{quote.description}

</p>


<p>

Importe: {quote.amount} €

</p>


<p>

Estado: {quote.status}

</p>


</div>


))

}





</div>

);


}


export default App;
