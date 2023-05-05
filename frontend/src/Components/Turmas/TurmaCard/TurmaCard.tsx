import { Link } from 'react-router-dom'
import './TurmaCard.css'
import { CardType } from '@/types'

export function TurmaCard({ id, nome, Alunos }: CardType) {
  return (
    <div className="card-select-turma">
      <Link to={`/turmas/${id}`} className='nome-turma'>{nome}</Link>
      <p>{Alunos}</p>
    </div>
  )
}