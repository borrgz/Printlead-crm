const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());


// =====================
// INICIO
// =====================

app.get("/", (req,res)=>{

res.json({
message:"PrintLead CRM API funcionando 🚀"
});

});



// =====================
// HISTORIAL CLIENTES
// =====================


app.get("/history/:customer",(req,res)=>{


const customer=req.params.customer;


db.all(

"SELECT * FROM customer_history WHERE customer=?",

[customer],

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





app.post("/history",(req,res)=>{


const {

customer,
action,
description,
date

}=req.body;



db.run(

`

INSERT INTO customer_history

(customer,action,description,date)

VALUES (?,?,?,?)

`,

[

customer,
action,
description,
date

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

customer,

action,

description,

date

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

"SELECT COUNT(*) AS total FROM followups WHERE status='Pendiente'",

[],

(err,followups)=>{


db.get(

"SELECT COUNT(*) AS total FROM quotes WHERE status='Pendiente'",

[],

(err,quotes)=>{


db.get(

"SELECT COUNT(*) AS total FROM orders WHERE status!='Finalizado'",

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




// =====================
// SERVIDOR
// =====================


app.listen(PORT,()=>{

console.log(
`Servidor iniciado en puerto ${PORT}`
);

});
