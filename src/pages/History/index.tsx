import { HistoryContainer, HistoryTable, Status } from './styles'

export function History() {
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
            <tr>
              <td>Task1</td>
              <td>23 minutes</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
            <tr>
              <td>Task1</td>
              <td>23 minutes</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
            <tr>
              <td>Task1</td>
              <td>23 minutes</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
            <tr>
              <td>Task1</td>
              <td>23 minutes</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryTable>
    </HistoryContainer>
  )
}
