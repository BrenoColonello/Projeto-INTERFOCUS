import { RenderComponent } from "simple-react-routing";
import Navbar from "../navbar";

export default function Layout(){
    return <>
    <Navbar></Navbar>
    <RenderComponent></RenderComponent>
    </>
}