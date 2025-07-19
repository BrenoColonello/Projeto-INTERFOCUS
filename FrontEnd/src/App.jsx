import { BrowserRouter } from "simple-react-routing";
import Home from "./home/home";
import './App.css'
import Layout from "./layout/layout";
import ListaMutuarios from "./mutuarios/lista_mutuarios/lista_mutuarios";
import ListaDividas from "./divida/lista_divida/Lista_Dividas"; //ta considerando meu arquivo com d minusculo nao sei o motivo

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
          path: "mutuarios",
          component: <ListaMutuarios></ListaMutuarios>
                  },
        {
          path: "dividas",
          component: <ListaDividas></ListaDividas>
        }
      
      ]}>
        <Layout></Layout>
        </BrowserRouter>
  );
}

export default App;
