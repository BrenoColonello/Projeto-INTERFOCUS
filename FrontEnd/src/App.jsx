import { BrowserRouter } from "simple-react-routing";
import Home from "./home/home";
import './App.css'
import Layout from "./layout/Layout";
import ListaMutuarios from "./lista_mutuarios/lista_mutuarios";

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
        }
      
      ]}>
        <Layout></Layout>
        </BrowserRouter>
  );
}

export default App;
