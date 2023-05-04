export interface ItemType {
  title: string
  answers: answers[]
}

interface answers {
  id: string
  name: string
}
export interface Relatorio {
  itens: Array<ItemType>
  dialog: Ref<HTMLDialogElement>
  aluno: AlunoType
  turma: Turma
}

export interface RelatorioType {
  fundamental: Array<ItemType>
  infantil: Array<ItemType>
}
