import React, { useState } from "react";


function PerfilCliente(){


const [history,setHistory]=useState([]);


const [customer,setCustomer]=useState("");



const searchHistory=()=>{


fetch(
`http://localhost:3000/history/${customer}`
)

.then(res=>res.json())

.then(data=>setHistory(data));


};





return (

<div>


<h1>
Perfil de Cliente
</h1>



<div className="card">


<input

placeholder="Nombre del cliente"

onChange={(e)=>setCustomer(e.target.value)}

/>



<button onClick={searchHistory}>

Buscar historial

</button>


</div>





<h2>
Historial comercial
</h2>




{

history.map(item=>(


<div className="card" key={item.id}>


<strong>

{item.action}

</strong>


<p>

{item.description}

</p>


<p>

Fecha: {item.date}

</p>


</div>


))


}



</div>

);


}


export default PerfilCliente;
