import { BrowserRouter } from "simple-react-routing";
import './App.css'
import Layout from "./layout/layout";
import FormMutuario from "./components/formMutuario";
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
        }
      ]}>
        <Layout></Layout>
        </BrowserRouter>
  );
}

export default App;
