import { Ref } from "react"
import { AlunoType } from "./Aluno.Type"
import { Turma } from "./Turma.type"

export interface RelatorioType {
  fundamental: Array<ItemType>
  infantil: Array<ItemType>
}

export interface ItemType {
  title: string
  answers: answers[]
}

interface answers {
  id: string,
  name: string
}
export interface Relatorio {
  itens: Array<ItemType>,
  dialog: Ref<HTMLDialogElement>,
  aluno: AlunoType
  turma: Turma
}