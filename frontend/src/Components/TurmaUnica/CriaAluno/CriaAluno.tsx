import { ChangeEvent, FormEvent, RefObject, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { NewAluno, fetchProps } from '@/types';
import { fetchData } from '@/services/fetchData';

export function CriaAluno({ dialog, turmaId }: { dialog: RefObject<HTMLDialogElement>, turmaId: number }) {
  const [formData, setFormData] = useState<NewAluno>({
    matricula: '',
    nome: ''
  })


  function handleSubmitForm(e: FormEvent) {
    e.preventDefault()
    if (formData) {
      criarAluno(turmaId, formData)
      dialog.current?.close()
    }
  }

  function criarAluno(turmaId: number, { matricula, nome }: NewAluno) {
    const token: string = JSON.parse(localStorage.getItem('token') || '""')

    if (token) {
      const createAluno = async () => {
        const fetchOptions: fetchProps = {
          endpoint: 'alunos',
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
      createAluno()
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
    <dialog ref={dialog}>
      <div className="dialog">
        <form onSubmit={handleSubmitForm}>
          <button
            onClick={(e) => {
              e.preventDefault();
              dialog.current?.close();
            }}
            className="close-dialog"
          >
            <IoIosCloseCircleOutline />
          </button>
          <label>
            <input type="text" name='nome' className="input-dialog" placeholder="Nome do Aluno" value={formData?.nome} onChange={handleInputChange} />
          </label>

          <label>
            <input type="number" name='matricula' className="input-dialog" placeholder="Matricula" value={formData?.matricula} onChange={handleInputChange} />
          </label>
          <button className="submit-newclass" type='submit'>Criar Aluno</button>
        </form>
      </div>
    </dialog>
  )
}