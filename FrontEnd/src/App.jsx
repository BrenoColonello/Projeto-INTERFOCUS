import { BrowserRouter } from "simple-react-routing";
import './App.css'
import Layout from "./layout/layout";
import FormMutuario from "./components/formMutuario";
import { FormDivida } from "./components/FormDivida";
import Home from "./layout/Home";


function App() {

  return (
<BrowserRouter
      notFoundPage={<h1>404 - NOT FOUND</h1>}
      routes={[
        {
          path: "",
          component: <Home></Home>
        },
                {
          path: "mutuarios/:codigo",
          component: <FormMutuario></FormMutuario>
        },
        {
          path: "mutuarios",
          component: <FormMutuario></FormMutuario>
        },
        {
          path: "dividas",
          component: <FormDivida></FormDivida>
        },
        {
          path: "dividas/:codigo",
          component: <FormDivida></FormDivida>
        }
      ]}>
        <Layout></Layout>
        </BrowserRouter>
  );
}

export default App;
