import React, { useEffect, useState } from "react";
import "./App.css";


function App(){


const [leads,setLeads]=useState([]);



const [leadForm,setLeadForm]=useState({

company:"",
sector:"",
contact:"",
phone:"",
email:"",
city:"",
status:"Nuevo",
notes:""

});




useEffect(()=>{

loadLeads();

},[]);





const loadLeads=()=>{


fetch("http://localhost:3000/leads")

.then(res=>res.json())

.then(data=>setLeads(data));


};





const handleChange=(e)=>{


setLeadForm({

...leadForm,

[e.target.name]:e.target.value

});


};





const addLead=()=>{


fetch(

"http://localhost:3000/leads",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(leadForm)

}

)


.then(res=>res.json())

.then(()=>{

loadLeads();

});


};







return(


<div className="container">


<h1>

PrintLead CRM 🚀

</h1>



<div className="card">


<h2>

Nueva empresa potencial

</h2>



<input

name="company"

placeholder="Empresa"

onChange={handleChange}

/>



<input

name="sector"

placeholder="Sector (hostelería, inmobiliaria...)"

onChange={handleChange}

/>



<input

name="contact"

placeholder="Persona de contacto"

onChange={handleChange}

/>



<input

name="phone"

placeholder="Teléfono"

onChange={handleChange}

/>



<input

name="email"

placeholder="Email"

onChange={handleChange}

/>



<input

name="city"

placeholder="Ciudad"

onChange={handleChange}

/>



<input

name="notes"

placeholder="Notas comerciales"

onChange={handleChange}

/>



<button onClick={addLead}>

Guardar oportunidad

</button>


</div>






<h2>

Empresas potenciales

</h2>




{

leads.map((lead)=>(


<div className="card" key={lead.id}>


<strong>

{lead.company}

</strong>


<p>

Sector: {lead.sector}

</p>


<p>

Contacto: {lead.contact}

</p>


<p>

Teléfono: {lead.phone}

</p>


<p>

Email: {lead.email}

</p>


<p>

Estado: {lead.status}

</p>


<p>

{lead.notes}

</p>


</div>


))


}



</div>


);


}


export default App;
