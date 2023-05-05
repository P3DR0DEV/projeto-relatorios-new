import { Turma, fetchProps } from "@/types"
import { useEffect, useRef, useState, MouseEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { AiOutlinePlus } from "react-icons/ai"
import { fetchData } from "@/services/fetchData"
import "./TurmaUnica.css"
import { AlunoList, CriaAluno, CriaProf } from "@/Components"

export function TurmaUnica() {
  const { id } = useParams()
  const [turma, setTurma] = useState<Turma>()
  const dialog = useRef<HTMLDialogElement>(null)
  const dialogProf = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token: string = JSON.parse(localStorage.getItem("token") || '""')

    if (token) {
      const getData = async () => {
        const fetchOptions: fetchProps = {
          endpoint: `turmas/${id}`,
          method: "GET",
          token,
        }
        const res = await fetchData(fetchOptions)
        setTurma(res)
      }
      getData()
    } else {
      navigate("/")
    }
  }, [])

  function toggleCreateNewClass(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    dialog.current?.showModal()
  }

  function toggleCreateNewProf(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    dialogProf.current?.showModal()
  }
  return (
    <>
      <div className="turma-unica">
        <div className="turma-unica-header">
          <div className="turma-unica-nome">
            <Link to={"/turmas"} className="link">
              <IoIosArrowBack />
            </Link>
            <h1 className="nome-turma">{turma?.nome}</h1>
            <p>
              {turma?.Professors?.length ? (
                `Professor(a): ${turma.Professors[0].nome}`
              ) : (
                <button
                  className="button-create-professor"
                  onClick={toggleCreateNewProf}
                >
                  Cadastrar Professor
                </button>
              )}
            </p>
          </div>

          <button
            className="button-create-aluno"
            onClick={toggleCreateNewClass}
          >
            Cadastrar Aluno
            <AiOutlinePlus fontSize={"1.25rem"} />
          </button>
        </div>

        <CriaAluno dialog={dialog} turmaId={Number(id)} />
        <CriaProf dialogProf={dialogProf} turmaId={Number(id)} />

        <div>
          <div className="turma-header">
            <div className="turma-header-nome">
              <p>Nome</p>
              <p>Matricula</p>
            </div>
            <p>Relatório</p>
          </div>
          {turma?.Alunos?.map((aluno) => {
            return <AlunoList key={aluno.id} aluno={aluno} turma={turma} />
          })}
        </div>
      </div>
    </>
  )
}
