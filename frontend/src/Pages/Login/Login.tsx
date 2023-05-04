import Form from "./Components/Form";
import { ImgComponent } from "./Components/ImgComponent";
import './Login.css'


export function Login() {
  return (
    <div className="container-login">
      <ImgComponent />
      <Form />
    </div>
  )
}