import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  TaskInput,
  TimeAmoutInput,
  Separator,
  StartCountdownButton,
} from './styles'

const TaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Please inform the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The time should be at least 5')
    .max(60, 'The time should be at a maximum of 60'),
})

type NewTaskFormData = zod.infer<typeof TaskValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(TaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewTaskFormData) {
    reset()
  }

  const task = watch('task')
  const disableSubmitButton = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name for your project"
            list="task-suggestions"
            {...register('task')}
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
            {...register('minutesAmount', { valueAsNumber: true })}
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

        <StartCountdownButton type="submit" disabled={disableSubmitButton}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
