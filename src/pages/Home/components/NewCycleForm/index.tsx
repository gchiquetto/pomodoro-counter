import { FormContainer, TaskInput, TimeAmoutInput } from './styles'

import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { cycleActive } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <div className="task-container">
        <label htmlFor="task">I will work on</label>
        <TaskInput
          type="text"
          id="task"
          placeholder="Give a name for your project"
          list="task-suggestions"
          {...register('task')}
          disabled={!!cycleActive}
        />
        <datalist id="task-suggestions">
          <option value="option 1" />
          <option value="option 2" />
          <option value="option 3" />
        </datalist>
      </div>

      <div>
        <label htmlFor="minutesAmout">for</label>
        <TimeAmoutInput
          type="number"
          id="minutesAmout"
          min={5}
          max={60}
          step={5}
          placeholder="00:00"
          {...register('minutesAmount', { valueAsNumber: true })}
          disabled={!!cycleActive}
        />
        <span>minutes</span>
      </div>
    </FormContainer>
  )
}
