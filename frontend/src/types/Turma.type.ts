import { AlunoType } from "./Aluno.Type"
import { ProfessorsType } from "./Professors.type"

export interface Turma {
  id: number
  nome: '3º Ano' | '2 Ano - VA' | '1º Ano - MA' | '1º Ano - VA' | 'Pré 2 - MA' | 'Pré 2 - VA' | 'Pré 1 - MA' | 'Pré 1 - VA' | 'Creche 1 - VA' | 'Creche 1 - MA' | 'Creche 2 - VA' | 'Creche 2 - MA' | 'Creche 3 - VA' | 'Creche 3 - MA'
  Alunos?: Array<AlunoType>
  Professors?: Array<ProfessorsType>
}

export interface CardType {
  id: number
  nome: string
  Alunos?: number
}
