import { BrowserRouter } from 'react-router-dom'
import { Router } from './Routes/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  )
}

