import React, { useEffect, useState } from "react";


function Leads(){


const [leads,setLeads]=useState([]);

const [file,setFile]=useState(null);



useEffect(()=>{


loadLeads();


},[]);





const loadLeads=()=>{


fetch("http://localhost:3000/leads")

.then(res=>res.json())

.then(data=>setLeads(data));


};





const uploadFile=()=>{


const formData=new FormData();


formData.append(
"file",
file
);



fetch(

"http://localhost:3000/import-leads",

{

method:"POST",

body:formData

}

)



.then(res=>res.json())

.then(()=>{


loadLeads();


});


};






const convertLead=(id)=>{


fetch(

`http://localhost:3000/convert-lead/${id}`,

{

method:"POST"

}

)


.then(()=>{


loadLeads();


});


};






return (

<div>


<h1>

Prospección Comercial

</h1>




<div className="card">


<h2>

Importar empresas

</h2>



<input

type="file"

accept=".csv"

onChange={(e)=>setFile(e.target.files[0])}

/>




<button onClick={uploadFile}>

Subir CSV

</button>


</div>







<h2>

Empresas potenciales

</h2>




{

leads.map(lead=>(


<div className="card" key={lead.id}>


<h3>

{lead.company}

</h3>


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




{

lead.status !== "Convertido" &&

<button

onClick={()=>convertLead(lead.id)}

>

Convertir en cliente

</button>


}



</div>


))


}



</div>

);


}


export default Leads;
