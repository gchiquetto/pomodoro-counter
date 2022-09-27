import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  TaskInput,
  TimeAmoutInput,
  Separator,
  StartCountdownButton,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name for your project"
            list="task-suggestions"
          />
          <datalist id="task-suggestions">
            <option value="option 1" />
            <option value="option 2" />
            <option value="option 3" />
          </datalist>

          <label htmlFor="minutesAmout">for</label>
          <TimeAmoutInput
            type="number"
            id="minutesAmout"
            min={5}
            max={60}
            step={5}
            placeholder="00:00"
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
