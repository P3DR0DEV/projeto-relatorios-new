import { Routes, Route } from "react-router-dom"
import { Login, TurmaUnica, Turmas } from "@/Pages"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/turmas" element={<Turmas />} />
      <Route path="/turmas/:id" element={<TurmaUnica />} />
    </Routes>
  )
}
