import { FotoType } from "./Fotos.type"

export interface AlunoType {
  id: number
  matricula: number
  nome: string
  Fotos: Array<FotoType>
}

export interface NewAluno {
  matricula: string
  nome: string
}