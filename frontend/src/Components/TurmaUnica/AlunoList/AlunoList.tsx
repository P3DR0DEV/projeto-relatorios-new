import "./AlunoList.css"
import { AlunoType, Turma, fetchProps } from "@/types"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { Relatorios } from "@/Components/Relatorios/Relatorios"
import { relatorios } from "@/utils/dataRelatorios"
import { fetchData } from "@/services/fetchData"
import { toast } from "react-toastify"
import { TiUserDeleteOutline } from "react-icons/ti"
import { HiOutlinePencilAlt } from "react-icons/hi"

const TURMAS = {
  "3º Ano": "fundamental",
  "2 Ano - VA": "fundamental",
  "1º Ano - MA": "fundamental",
  "1º Ano - VA": "fundamental",
  "Pré 2 - MA": "infantil",
  "Pré 2 - VA": "infantil",
  "Pré 1 - MA": "infantil",
  "Pré 1 - VA": "infantil",
  "Creche 1 - VA": "infantil",
  "Creche 1 - MA": "infantil",
  "Creche 2 - VA": "infantil",
  "Creche 2 - MA": "infantil",
  "Creche 3 - VA": "infantil",
  "Creche 3 - MA": "infantil",
} as const

interface PdfStatus {
  exists: boolean
  url?: string
}

export function AlunoList({
  aluno,
  turma,
}: {
  aluno: AlunoType
  turma: Turma
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const { matricula, nome } = aluno
  const tipoRelatorio = TURMAS[turma.nome]
  const [pdfStatus, setPdfStatus] = useState<PdfStatus>({ exists: false })
  const [userData, setUserData] = useState<{
    user: number
    isAdmin: boolean
  } | null>(null)
  const token: string = JSON.parse(localStorage.getItem("token") || "''")

  function handlePdfDownload(event: MouseEvent<HTMLButtonElement>) {
    const getPdf = async () => {
      event.preventDefault()
      const fetchOptions: fetchProps = {
        method: "GET",
        token,
        endpoint: `downloads/${aluno.matricula}`,
        responseType: "blob",
      }

      const downloadPdf = await fetchData(fetchOptions)
      if (downloadPdf) {
        const blob = await downloadPdf
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${aluno.matricula}.pdf`
        link.click()
      } else {
        toast.error("Este arquivo ainda não foi gerado")
      }
    }
    getPdf()
  }

  function handleDeleteUser(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const deleteUser = async () => {
      const fetchOptions: fetchProps = {
        method: "DELETE",
        token,
        endpoint: `alunos/delete/${aluno.id}`,
      }
      await fetchData(fetchOptions)
      location.reload()
    }
    deleteUser()
  }

  function handleUpdateUser(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const updateUser = async () => {
      const fetchOptions: fetchProps = {
        method: "PUT",
        token,
        endpoint: `alunos/update/${aluno.id}`,
      }
      await fetchData(fetchOptions)
      location.reload()
    }
    updateUser()
  }
  useEffect(() => {
    const checkPdfStatus = async () => {
      fetch(`http://localhost:3000/${aluno.matricula}`, {
        method: "HEAD",
      }).then((response) => {
        if (response.status === 404) return
        setPdfStatus({ exists: response.status === 200 })
      })
    }

    checkPdfStatus()
  }, [aluno.matricula])

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

  return (
    <div className="alunos-list">
      <div className="aluno-list-nome">
        <p className="aluno-list-nome--nome" title={nome}>
          {nome}
        </p>
        <p>{matricula}</p>
      </div>
      <div className="buttons">
        {pdfStatus.exists && (
          <button className="button-relatorios" onClick={handlePdfDownload}>
            Baixar Relatório
          </button>
        )}
        <button
          onClick={() => dialog.current?.showModal()}
          className="button-relatorios"
        >
          Gerar Relatório
        </button>
        {userData?.isAdmin && (
          <button className="button-update-user" onClick={handleUpdateUser}>
            <HiOutlinePencilAlt />
          </button>
        )}
        {userData?.isAdmin && (
          <button className="button-delete-user" onClick={handleDeleteUser}>
            <TiUserDeleteOutline />
          </button>
        )}
      </div>

      <Relatorios
        dialog={dialog}
        itens={relatorios[tipoRelatorio]}
        aluno={aluno}
        turma={turma}
        tipoRelatorio={tipoRelatorio}
      />
    </div>
  )
}
