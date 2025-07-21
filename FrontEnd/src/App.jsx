// filepath: c:\Users\breno\source\repos\INTERFOCUS-PROJETO\FrontEnd\src\App.jsx
import React from 'react';
import { BrowserRouter } from "simple-react-routing";
import './App.css'
import Layout from "./layout/layout";  // Mudou de "layout" para "Layout"
import FormMutuario from "./components/formMutuario";
import { FormDivida } from "./components/formDivida";  // Mudou de "FormDivida" para "formDivida"
import Home from "./layout/Home";

function App() {
  return (
    <BrowserRouter
      notFoundPage={<h1>404 - NOT FOUND</h1>}
      routes={[
        {
          path: "",
          component: <Home />
        },
        {
          path: "mutuarios/:codigo",
          component: <FormMutuario />
        },
        {
          path: "mutuarios",
          component: <FormMutuario />
        },
        {
          path: "dividas",
          component: <FormDivida />
        },
        {
          path: "dividas/:codigo",
          component: <FormDivida />
        }
      ]}>
      <Layout />
    </BrowserRouter>
  );
}

export default App;