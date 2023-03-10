import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <pre>{JSON.stringify(cycles, null, 2)}</pre>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Ha 2 meses</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
          </tbody>
          <tr>
            <td>Tarefa</td>
            <td>20 minutos</td>
            <td>Ha 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>Tarefa</td>
            <td>20 minutos</td>
            <td>Ha 2 meses</td>
            <td>
              <Status statusColor="yellow">Em andamento</Status>
            </td>
          </tr>
          <tr>
            <td>Tarefa</td>
            <td>20 minutos</td>
            <td>Ha 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>Tarefa</td>
            <td>20 minutos</td>
            <td>Ha 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
