import { Turma, fetchProps } from "@/types"
import { useEffect, useState, MouseEvent, useRef } from "react"
import "./Turmas.css"
import { AiOutlinePlus } from "react-icons/ai"
import { CriarTurma } from "./components/CriarTurma"
import { TurmaCard } from "./components/TurmaCard"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchData } from "@/services/fetchData"

export function Turmas() {
  const [data, setData] = useState<Turma[]>([])
  const [userData, setUserData] = useState<{
    user: number
    isAdmin: boolean
  } | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") || '""')
    if (token) {
      fetch("http://localhost:3000/me", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) =>
          setUserData({
            ...data,
            user: Number(data.user),
            isAdmin: data.isAdmin,
          })
        )
    }
  }, [])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") || '""')

    if (token) {
      const getData = async () => {
        const fetchOptions: fetchProps = {
          endpoint: "turmas",
          method: "GET",
          token,
        }
        const response = await fetchData(fetchOptions)
        setData([...response])
      }
      getData()
    } else {
      toast.error("You must be logged in")
      navigate("/")
    }
  }, [])

  function toggleCreateNewClass(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    dialog.current?.showModal()
  }

  return (
    <div>
      <div className="create-turma">
        <h1>Turmas</h1>
        {userData?.isAdmin ? (
          <button
            className="button-create-turma"
            onClick={toggleCreateNewClass}
          >
            Cadastrar Turma
            <AiOutlinePlus fontSize={"1.25rem"} />
          </button>
        ) : (
          ""
        )}

        <CriarTurma dialog={dialog} />
      </div>
      <div className="turmas-card">
        <div className="card-header">
          <p>Turma</p>
          <p>Nº Alunos</p>
        </div>

        {data.map((turma) => {
          if (userData?.isAdmin) {
            return (
              <TurmaCard
                key={turma.id}
                id={turma.id}
                nome={turma.nome}
                Alunos={turma.Alunos?.length}
              />
            )
          } else if (turma.Professors?.length) {
            if (userData?.user === turma.Professors[0].matricula) {
              return (
                <TurmaCard
                  key={turma.id}
                  id={turma.id}
                  nome={turma.nome}
                  Alunos={turma.Alunos?.length}
                />
              )
            }
          }
        })}
      </div>
    </div>
  )
}
