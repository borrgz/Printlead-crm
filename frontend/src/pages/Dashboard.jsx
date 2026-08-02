import React, { useEffect, useState } from "react";


function Dashboard(){


const [stats,setStats]=useState({

customers:0,
leads:0,
followups:0,
quotes:0,
orders:0

});



useEffect(()=>{


fetch("http://localhost:3000/dashboard-stats")

.then(res=>res.json())

.then(data=>setStats(data));


},[]);





return (

<div>


<h1>
Dashboard
</h1>



<div className="dashboard">


<div className="stat">

<h3>{stats.customers}</h3>

<p>👥 Clientes</p>

</div>



<div className="stat">

<h3>{stats.leads}</h3>

<p>📈 Leads</p>

</div>



<div className="stat">

<h3>{stats.followups}</h3>

<p>📞 Seguimientos</p>

</div>



<div className="stat">

<h3>{stats.quotes}</h3>

<p>💰 Presupuestos</p>

</div>



<div className="stat">

<h3>{stats.orders}</h3>

<p>📦 Pedidos</p>

</div>



</div>


</div>

);


}


export default Dashboard;
