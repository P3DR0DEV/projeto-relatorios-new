import { AlunoType, Turma, ItemType } from "@/types"
import "./Relatorios.css"
import { ChangeEvent, FormEvent, RefObject, useState } from "react"
import { toast } from "react-toastify"

interface RelatorioProps {
  itens: ItemType[]
  dialog: RefObject<HTMLDialogElement>
  aluno: AlunoType
  turma: Turma
  tipoRelatorio: "fundamental" | "infantil"
}

export function Relatorios({
  itens,
  dialog,
  aluno,
  turma,
  tipoRelatorio,
}: RelatorioProps) {
  const [formData, setFormData] = useState({})
  const [file, setFile] = useState<File | null>(null)
  const [foto, setFoto] = useState("")
  const [etapa, setEtapa] = useState("")
  const [textArea, setTextArea] = useState("")

  function handleFileSubit(e: FormEvent) {
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem("token") || '""')
    const formFileData = new FormData()
    if (file) {
      formFileData.append("aluno_id", String(aluno.id))
      formFileData.append("profilePic", file)
    }

    if (token) {
      fetch("http://localhost:3000/uploads/", {
        method: "POST",
        body: formFileData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          location.reload()
          data.errors
            ? toast.error("Arquivo não enviado")
            : toast.success("Arquivo enviado com sucesso!")
        })
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
      const fileURL = URL.createObjectURL(event.target.files[0])
      setFoto(fileURL)
    }
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    if (formData && etapa !== "") {
      submitForm(formData)
      dialog.current?.close()
    } else {
      dialog.current?.close()
      toast.warn(
        `Relatório não enviado, favor selecionar a etapa corretamente no aluno "${aluno.nome}"`
      )
    }
  }
  //eslint-disable-next-line
  function submitForm(formData: any) {
    const token = JSON.parse(localStorage.getItem("token") || '""')

    if (token) {
      fetch("http://localhost:3000/relatorios/", {
        method: "POST",
        body: JSON.stringify({
          tipoRelatorio,
          etapa,
          formData,
          obs: textArea,
          aluno,
          turma: turma,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error("Falha ao gerar o arquivo")
          } else {
            toast.success(data.success)
            location.reload()
          }
        })
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.currentTarget

    setFormData((prevformData) => {
      return {
        ...prevformData,
        [name]: value,
      }
    })
  }
  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.currentTarget
    setTextArea(value)
  }
  function handleEtapaChange(e: ChangeEvent<HTMLSelectElement>) {
    const { value } = e.currentTarget
    setEtapa(value)
  }
  return (
    <dialog ref={dialog} className="dialog-relatorios">
      <div className="container-relatorios">
        <h1 className="title">Relatório Descritivo</h1>
        <div className="nome-aluno">
          <div>
            <div>
              <p>{turma.nome}</p>
              <p>
                Professor(a):{" "}
                {turma.Professors?.length ? turma.Professors[0].nome : ""}
              </p>
            </div>
            <label htmlFor="etapa">
              Etapa:
              <select
                name="etapa"
                className="label-item-select"
                onChange={handleEtapaChange}
                required
              >
                <option value="">--Selecionar--</option>
                <option value="1">1º Etapa</option>
                <option value="2">2º Etapa</option>
                <option value="3">3º Etapa</option>
              </select>
            </label>
          </div>
          <div className="aluno-foto">
            {aluno.Fotos.length ? (
              <img
                src={aluno.Fotos[0].url}
                alt="Foto do aluno"
                className="profilePic"
              />
            ) : (
              <form onSubmit={handleFileSubit}>
                {foto ? (
                  <img src={foto} alt="" className="profilePic" />
                ) : (
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleFileChange}
                  />
                )}
                <button className="submit-pic">Enviar Foto</button>
              </form>
            )}
            <p className="aluno-foto">
              {aluno.matricula} - {aluno.nome}
            </p>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          {itens.map((item: ItemType) => {
            return (
              <div key={item.title}>
                <h2 key={item.title} className="item-title">
                  {item.title}
                </h2>
                <div className="divisor"></div>

                {item.answers.map((answer) => {
                  return (
                    <label key={answer.id} className="label-item">
                      <p>
                        {answer.id} - {answer.name}
                      </p>
                      <select
                        name={answer.id}
                        className="label-item-select"
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">--Selecionar--</option>
                        <option value="S">Desenvolveu</option>
                        <option value="N">Em Desenvolvimento</option>
                      </select>
                    </label>
                  )
                })}
              </div>
            )
          })}
          <textarea
            name="obs"
            id="obs"
            className="textarea"
            rows={10}
            placeholder="Considerações Finais"
            onChange={handleTextAreaChange}
          ></textarea>
          <button className="submit-form-button">Enviar</button>
        </form>
      </div>
    </dialog>
  )
}
