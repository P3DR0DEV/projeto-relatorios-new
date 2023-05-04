import { Routes, Route } from 'react-router-dom'
import { Login } from '../Pages/Login/Login'
import { Turmas } from '../Pages/Turmas/Turmas'
import { TurmaUnica } from '@/Pages/TurmaUnica/TurmaUnica'


export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/turmas' element={<Turmas />} />
      <Route path='/turmas/:id' element={<TurmaUnica />} />
    </Routes>
  )
}