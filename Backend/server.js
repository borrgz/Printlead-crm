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
// CONVERTIR LEAD EN CLIENTE
// =====================

app.post("/convert-lead/:id",(req,res)=>{


  const leadId = req.params.id;


  db.get(

    "SELECT * FROM leads WHERE id=?",

    [leadId],

    (err,lead)=>{


      if(err || !lead){

        res.status(404).json({

          error:"Lead no encontrado"

        });

        return;

      }



      db.run(

        `
        INSERT INTO customers
        (name, company, phone, email)
        VALUES (?,?,?,?)
        `,

        [

          lead.contact,
          lead.company,
          lead.phone,
          lead.email

        ],


        function(err){


          if(err){

            res.status(500).json({

              error:err.message

            });

            return;

          }



          db.run(

            `
            UPDATE leads
            SET status='Convertido'
            WHERE id=?
            `,

            [leadId]

          );



          res.json({

            message:"Lead convertido en cliente",

            customerId:this.lastID

          });



        }


      );


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

                        customers: customers.total,

                        leads: leads.total,

                        followups: followups.total,

                        quotes: quotes.total,

                        orders: orders.total

                      });


                    }


                  );


                }


              );


            }


          );


        }


      );


    }


  );


});



// =====================
// SERVIDOR
// =====================

app.listen(PORT,()=>{

  console.log(
    `Servidor iniciado en puerto ${PORT}`
  );

});
