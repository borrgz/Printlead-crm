const express = require("express");
const db = require("./database");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();

const PORT = 3000;


app.use(express.json());



// =====================
// CONFIGURACIÓN SUBIDA CSV
// =====================


const upload = multer({

dest:"uploads/"

});





// =====================
// INICIO
// =====================


app.get("/",(req,res)=>{


res.json({

message:"PrintLead CRM API funcionando 🚀"

});


});





// =====================
// IMPORTAR EMPRESAS CSV
// =====================


app.post(

"/import-leads",

upload.single("file"),

(req,res)=>{


const results=[];



fs.createReadStream(req.file.path)

.pipe(csv())


.on("data",(data)=>{


results.push(data);


})



.on("end",()=>{


results.forEach((lead)=>{


db.run(

`

INSERT INTO leads

(company,sector,contact,phone,email,city,status,notes)

VALUES (?,?,?,?,?,?,?,?)

`,

[

lead.company,

lead.sector,

lead.contact,

lead.phone,

lead.email,

lead.city,

"Nuevo",

lead.notes

]


);


});




fs.unlinkSync(req.file.path);



res.json({

message:"Empresas importadas correctamente",

total:results.length

});



});



}

);







// =====================
// CONVERTIR LEAD EN CLIENTE
// =====================


app.post("/convert-lead/:id",(req,res)=>{


const id=req.params.id;



db.get(

"SELECT * FROM leads WHERE id=?",

[id],

(err,lead)=>{


if(!lead){

res.status(404).json({

error:"Lead no encontrado"

});

return;

}



db.run(

`

INSERT INTO customers

(name,company,phone,email)

VALUES (?,?,?,?)

`,

[

lead.contact,

lead.company,

lead.phone,

lead.email

]

);



db.run(

`

UPDATE leads

SET status='Convertido'

WHERE id=?

`,

[id]

);



res.json({

message:"Cliente creado correctamente"

});


}

);


});







// =====================
// DASHBOARD
// =====================


app.get("/dashboard-stats",(req,res)=>{


db.get(

"SELECT COUNT(*) AS total FROM customers",

[],

(err,customers)=>{


db.get(

"SELECT COUNT(*) AS total FROM leads",

[],

(err,leads)=>{


db.get(

"SELECT COUNT(*) AS total FROM followups",

[],

(err,followups)=>{


db.get(

"SELECT COUNT(*) AS total FROM quotes",

[],

(err,quotes)=>{


db.get(

"SELECT COUNT(*) AS total FROM orders",

[],

(err,orders)=>{


res.json({

customers:customers.total,

leads:leads.total,

followups:followups.total,

quotes:quotes.total,

orders:orders.total

});


});


});


});


});


});


});

});







app.listen(PORT,()=>{


console.log(

`Servidor iniciado en puerto ${PORT}`

);


});
