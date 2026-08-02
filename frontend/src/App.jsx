import React, { useEffect, useState } from "react";
import "./App.css";


function App() {


const [dashboard,setDashboard]=useState({

customers:0,
pending_followups:0,
open_quotes:0,
active_orders:0

});


const [orders,setOrders]=useState([]);



const [orderForm,setOrderForm]=useState({

customer:"",
product:"",
description:"",
status:"Diseño",
delivery_date:""

});




useEffect(()=>{

loadDashboard();

loadOrders();

},[]);




const loadDashboard=()=>{


fetch("http://localhost:3000/dashboard")

.then(res=>res.json())

.then(data=>setDashboard(data));


};





const loadOrders=()=>{


fetch("http://localhost:3000/orders")

.then(res=>res.json())

.then(data=>setOrders(data));


};





const handleChange=(e)=>{


setOrderForm({

...orderForm,

[e.target.name]:e.target.value

});


};






const addOrder=()=>{


fetch(

"http://localhost:3000/orders",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(orderForm)

}

)


.then(res=>res.json())

.then(()=>{


loadOrders();

loadDashboard();


});


};







return(


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


<h2>Nuevo pedido</h2>



<input

name="customer"

placeholder="Cliente"

onChange={handleChange}

/>



<input

name="product"

placeholder="Producto o trabajo"

onChange={handleChange}

/>




<input

name="description"

placeholder="Descripción"

onChange={handleChange}

/>




<select

name="status"

onChange={handleChange}

>


<option>Diseño</option>

<option>Producción</option>

<option>Instalación</option>

<option>Finalizado</option>


</select>




<input

name="delivery_date"

placeholder="Fecha entrega"

onChange={handleChange}

/>





<button onClick={addOrder}>

Guardar pedido

</button>



</div>








<h2>Trabajos en producción</h2>




{

orders.map(order=>(


<div className="card" key={order.id}>


<strong>{order.customer}</strong>


<p>{order.product}</p>


<p>{order.description}</p>


<p>Estado: {order.status}</p>


<p>Entrega: {order.delivery_date}</p>



</div>


))


}




</div>


);


}



export default App;
