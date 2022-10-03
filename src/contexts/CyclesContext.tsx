import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { json } from 'react-router-dom'
import {
  ActionTypes,
  addNewCycleAction,
  markCycleAsFinishedAction,
  setCycleActiveIdAsNull,
  stopCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  cycleActive: Cycle | undefined
  cycleActiveId: string | null
  amountSecondsPassed: number
  markCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  setActiveIdAsNull: () => void
  createNewCycle: (data: CreateCycleData) => void
  stopCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      cycleActiveId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-counter-ignite:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const { cycles, cycleActiveId } = cyclesState

  const cycleActive = cycles.find((cycle) => cycle.id === cycleActiveId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (cycleActive) {
      return differenceInSeconds(new Date(), new Date(cycleActive.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(
      '@pomodoro-counter-ignite:cycles-state-1.0.0',
      stateJSON,
    )
  }, [cyclesState])

  function markCycleAsFinished() {
    dispatch(markCycleAsFinishedAction(cycleActiveId))
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function stopCycle() {
    dispatch(stopCycleAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function setActiveIdAsNull() {
    dispatch(setCycleActiveIdAsNull(cycleActiveId))
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        cycleActive,
        cycleActiveId,
        amountSecondsPassed,
        markCycleAsFinished,
        setSecondsPassed,
        setActiveIdAsNull,
        createNewCycle,
        stopCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
