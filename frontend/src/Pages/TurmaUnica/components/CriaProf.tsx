interface CriaProfProps {
  dialogProf: RefObject<HTMLDialogElement>,
  turmaId: number
}

import { fetchData } from "@/services/fetchData";
import { fetchProps, newProfessor } from "@/types";
import { ChangeEvent, FormEvent, RefObject, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export function CriaProf({ dialogProf, turmaId }: CriaProfProps) {
  const [formData, setFormData] = useState<newProfessor>({
    matricula: '',
    nome: ''
  })
  function handleSubmitForm(e: FormEvent) {
    e.preventDefault()
    if (formData) {
      criarProf(turmaId, formData)
      dialogProf.current?.close()
    }
  }

  function criarProf(turmaId: number, { matricula, nome }: newProfessor) {
    const token: string = JSON.parse(localStorage.getItem('token') || '""')

    if (token) {
      const createProfessor = async () => {
        const fetchOptions: fetchProps = {
          endpoint: 'professores',
          method: 'POST',
          token,
          body: {
            turma_id: turmaId,
            matricula: Number(matricula),
            nome
          }
        }
        const res = await fetchData(fetchOptions)
        if (res) location.reload()
      }
      createProfessor()
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget

    setFormData(prevFormData => {
      if (prevFormData) {
        return {
          ...prevFormData,
          [name]: value
        }
      }
      return prevFormData
    })

  }

  return (
    <dialog ref={dialogProf}>
      <div className="dialog">
        <form onSubmit={handleSubmitForm}>
          <button
            onClick={(e) => {
              e.preventDefault();
              dialogProf.current?.close();
            }}
            className="close-dialog"
          >
            <IoIosCloseCircleOutline />
          </button>
          <label>
            <input type="text" name='nome' className="input-dialog" placeholder="Nome do Professor" value={formData?.nome} onChange={handleInputChange} />
          </label>

          <label>
            <input type="number" name='matricula' className="input-dialog" placeholder="Matricula" value={formData?.matricula} onChange={handleInputChange} />
          </label>
          <button className="submit-newclass" type='submit'>Criar Professor</button>
        </form>
      </div>
    </dialog>
  )
}