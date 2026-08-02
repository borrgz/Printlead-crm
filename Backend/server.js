const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());


// INICIO

app.get("/", (req,res)=>{

res.json({
message:"PrintLead CRM API funcionando 🚀"
});

});



// =====================
// LEADS COMERCIALES
// =====================



app.get("/leads",(req,res)=>{


db.all(

"SELECT * FROM leads",

[],

(err,rows)=>{


if(err){

res.status(500).json({
error:err.message
});

return;

}


res.json(rows);


}

);


});






app.post("/leads",(req,res)=>{


const {

company,
sector,
contact,
phone,
email,
city,
status,
notes

}=req.body;



db.run(

`

INSERT INTO leads

(company,sector,contact,phone,email,city,status,notes)

VALUES (?,?,?,?,?,?,?,?)

`,

[

company,
sector,
contact,
phone,
email,
city,
status || "Nuevo",
notes

],


function(err){


if(err){

res.status(500).json({
error:err.message
});

return;

}



res.json({

id:this.lastID,
company,
sector,
contact,
phone,
email,
city,
status,
notes

});


}

);


});




// =====================
// DASHBOARD LEADS
// =====================


app.get("/dashboard-leads",(req,res)=>{


db.get(

"SELECT COUNT(*) AS total FROM leads",

[],

(err,result)=>{


res.json({

total_leads: result.total

});


}

);


});




// SERVIDOR


app.listen(PORT,()=>{

console.log(
`Servidor iniciado en puerto ${PORT}`
);

});
