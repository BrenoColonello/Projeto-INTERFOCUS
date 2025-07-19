import { BrowserRouter } from "simple-react-routing";
import './App.css'
import Layout from "./layout/layout";


function App() {

  return (
<BrowserRouter
      notFoundPage={<h1>404 - NOT FOUND</h1>}
      routes={[
        {
          path: "",
          component: <Home></Home>
        },
      ]}>
        <Layout></Layout>
        </BrowserRouter>
  );
}

export default App;
