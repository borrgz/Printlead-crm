import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Leads from "./pages/Leads";
import Seguimientos from "./pages/Seguimientos";
import Presupuestos from "./pages/Presupuestos";
import Pedidos from "./pages/Pedidos";

import "./App.css";


function App(){


return (

<BrowserRouter>


<div className="layout">



<div className="sidebar">


<h2>
PrintLead CRM
</h2>



<Link to="/">
🏠 Dashboard
</Link>


<Link to="/clientes">
👥 Clientes
</Link>



<Link to="/leads">
📈 Prospección
</Link>



<Link to="/seguimientos">
📞 Seguimientos
</Link>



<Link to="/presupuestos">
💰 Presupuestos
</Link>



<Link to="/pedidos">
📦 Pedidos
</Link>



</div>





<div className="content">


<Routes>


<Route path="/" element={<Dashboard />} />

<Route path="/clientes" element={<Clientes />} />

<Route path="/leads" element={<Leads />} />

<Route path="/seguimientos" element={<Seguimientos />} />

<Route path="/presupuestos" element={<Presupuestos />} />

<Route path="/pedidos" element={<Pedidos />} />


</Routes>


</div>



</div>


</BrowserRouter>

);


}


export default App;
