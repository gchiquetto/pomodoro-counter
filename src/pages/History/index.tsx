import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryTable, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>My History</h1>
      <HistoryTable>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              const dateDistance = formatDistanceToNow(
                new Date(cycle.startDate),
                {
                  addSuffix: true,
                },
              )
              const dateFormatted =
                dateDistance.charAt(0).toUpperCase() + dateDistance.slice(1)

              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>{dateFormatted}</td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Finished</Status>
                    )}
                    {cycle.stopedDate && (
                      <Status statusColor="red">Interruped</Status>
                    )}
                    {!cycle.stopedDate && !cycle.finishedDate && (
                      <Status statusColor="yellow">Active</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryTable>
    </HistoryContainer>
  )
}
