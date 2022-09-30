import { Play, Stop } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'

import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  TaskInput,
  TimeAmoutInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'

const TaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Please inform the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The time should be at least 5')
    .max(60, 'The time should be at a maximum of 60'),
})

type NewTaskFormData = zod.infer<typeof TaskValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [cycleActiveId, setCycleActiveId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(TaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewTaskFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setCycleActiveId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleStopCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === cycleActiveId) {
          return { ...cycle, stopedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setCycleActiveId(null)
  }

  const cycleActive = cycles.find((cycle) => cycle.id === cycleActiveId)
  const totalSeconds = cycleActive ? cycleActive.minutesAmount * 60 : 0
  useEffect(() => {
    let interval: number

    if (cycleActive) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          cycleActive.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === cycleActiveId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [cycleActive, totalSeconds, cycleActiveId])

  const currentSeconds = cycleActive ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // Show the time on browser tab
  useEffect(() => {
    if (cycleActive) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds])

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
            disabled={!!cycleActive}
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
            disabled={!!cycleActive}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {cycleActive ? (
          <StopCountdownButton onClick={handleStopCycle}>
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
