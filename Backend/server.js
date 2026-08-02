const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());


// INICIO

app.get("/", (req, res) => {

  res.json({
    message: "PrintLead CRM API funcionando 🚀"
  });

});


// CLIENTES

app.get("/customers", (req, res) => {

  db.all(
    "SELECT * FROM customers",
    [],
    (err, rows) => {

      if (err) {
        res.status(500).json({
          error: err.message
        });
        return;
      }

      res.json(rows);

    }
  );

});


app.post("/customers", (req, res) => {

  const {
    name,
    company,
    phone,
    email
  } = req.body;


  db.run(

    `
    INSERT INTO customers
    (name, company, phone, email)
    VALUES (?, ?, ?, ?)
    `,

    [
      name,
      company,
      phone,
      email
    ],

    function(err) {

      if(err){

        res.status(500).json({
          error: err.message
        });

        return;

      }


      res.json({
        id:this.lastID,
        name,
        company,
        phone,
        email
      });


    }

  );


});



// SEGUIMIENTOS

app.get("/followups",(req,res)=>{

  db.all(
    "SELECT * FROM followups",
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



app.post("/followups",(req,res)=>{


  const {
    customer,
    type,
    note,
    next_action,
    status
  } = req.body;



  db.run(

    `
    INSERT INTO followups
    (customer,type,note,next_action,status)
    VALUES (?,?,?,?,?)
    `,

    [
      customer,
      type,
      note,
      next_action,
      status || "Pendiente"
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
        type,
        note,
        next_action,
        status
      });


    }

  );


});



// PRESUPUESTOS

app.get("/quotes",(req,res)=>{


  db.all(
    "SELECT * FROM quotes",
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



app.post("/quotes",(req,res)=>{


  const {
    customer,
    product,
    description,
    amount,
    status,
    date
  } = req.body;



  db.run(

    `
    INSERT INTO quotes
    (customer,product,description,amount,status,date)
    VALUES (?,?,?,?,?,?)
    `,


    [
      customer,
      product,
      description,
      amount,
      status || "Pendiente",
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
        product,
        description,
        amount,
        status,
        date
      });


    }

  );


});




// PEDIDOS

app.get("/orders",(req,res)=>{


  db.all(

    "SELECT * FROM orders",

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




app.post("/orders",(req,res)=>{


  const {

    customer,
    product,
    description,
    status,
    delivery_date

  } = req.body;



  db.run(

    `
    INSERT INTO orders
    (customer,product,description,status,delivery_date)
    VALUES (?,?,?,?,?)
    `,


    [
      customer,
      product,
      description,
      status || "Diseño",
      delivery_date
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
        product,
        description,
        status,
        delivery_date

      });


    }

  );


});



// DASHBOARD

app.get("/dashboard",(req,res)=>{


  db.get(
    "SELECT COUNT(*) AS total FROM customers",
    [],
    (err,customers)=>{


      db.get(
        "SELECT COUNT(*) AS total FROM followups WHERE status='Pendiente'",
        [],
        (err,followups)=>{


          db.get(
            "SELECT COUNT(*) AS total FROM quotes WHERE status='Pendiente'",
            [],
            (err,quotes)=>{


              db.get(
                "SELECT COUNT(*) AS total FROM orders",
                [],
                (err,orders)=>{


                  res.json({

                    customers:customers.total,
                    pending_followups:followups.total,
                    open_quotes:quotes.total,
                    active_orders:orders.total

                  });


                }
              );


            }
          );


        }
      );


    }
  );


});



// SERVIDOR

app.listen(PORT,()=>{

  console.log(
    `Servidor iniciado en puerto ${PORT}`
  );

});
