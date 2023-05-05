import { IoIosCloseCircleOutline } from "react-icons/io"
import { FormEvent, RefObject, useState } from "react"
import { fetchData } from "@/services/fetchData"
import { fetchProps } from "@/types"
import "./CriarTurma.css"

export function CriarTurma({
  dialog,
}: {
  dialog: RefObject<HTMLDialogElement>
}) {
  const [nomeTurma, setNomeTurma] = useState("")

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault()
    create(nomeTurma)
    dialog.current?.close()
  }

  function create(nome: string) {
    const token: string = JSON.parse(localStorage.getItem("token") || '""')

    if (token) {
      const createTurma = async () => {
        const fetchOptions: fetchProps = {
          endpoint: "turmas/create",
          method: "POST",
          token,
          body: { nome },
        }
        const res = await fetchData(fetchOptions)
        if (res) location.reload()
      }
      createTurma()
    }
  }
  return (
    <dialog ref={dialog}>
      <div className="dialog">
        <form onSubmit={handleSubmitForm}>
          <button
            onClick={(e) => {
              e.preventDefault()
              dialog.current?.close()
            }}
            className="close-dialog"
          >
            <IoIosCloseCircleOutline />
          </button>
          <label>
            <input
              type="text"
              className="input-dialog"
              placeholder="Nome da Turma"
              value={nomeTurma}
              onChange={(e) => setNomeTurma(e.target.value)}
            />
          </label>
          <button className="submit-newclass">Criar Turma</button>
        </form>
      </div>
    </dialog>
  )
}
