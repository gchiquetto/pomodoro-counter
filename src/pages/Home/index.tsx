import { Play, Stop } from 'phosphor-react'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const TaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Please inform the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The time should be at least 5')
    .max(60, 'The time should be at a maximum of 60'),
})

type NewTaskFormData = zod.infer<typeof TaskValidationSchema>

export function Home() {
  const { createNewCycle, stopCycle, cycleActive } = useContext(CyclesContext)

  const newCycleForm = useForm<NewTaskFormData>({
    resolver: zodResolver(TaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewTaskFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const disableSubmitButton = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {cycleActive ? (
          <StopCountdownButton onClick={stopCycle}>
            <Stop size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={disableSubmitButton}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
