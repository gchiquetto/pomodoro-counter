import { createContext, ReactNode, useReducer, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopedDate?: Date
  finishedDate?: Date
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

interface CyclesSate {
  cycles: Cycle[]
  cycleActiveId: string | null
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // const [cycles, setCycles] = useState<Cycle[]>([])
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesSate, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            cycleActiveId: action.payload.newCycle.id,
          }
        case 'STOP_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.cycleActiveId) {
                return { ...cycle, stopedDate: new Date() }
              } else {
                return cycle
              }
            }),
            cycleActiveId: null,
          }
        case 'MARK_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.cycleActiveId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
            cycleActiveId: null,
          }
        case 'SET_CYCLE_ACTIVE_ID_AS_NULL':
          return {
            ...state,
            cycles: [...state.cycles],
            cycleActiveId: action.payload,
          }
        default:
          return state
      }
    },
    { cycles: [], cycleActiveId: null },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, cycleActiveId } = cyclesState

  const cycleActive = cycles.find((cycle) => cycle.id === cycleActiveId)

  function markCycleAsFinished() {
    dispatch({
      type: 'MARK_CYCLE_AS_FINISHED',
      payload: { cycleActiveId },
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: { newCycle },
    })

    setAmountSecondsPassed(0)
    // reset()
  }

  function stopCycle() {
    dispatch({
      type: 'STOP_CYCLE',
      payload: null,
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function setActiveIdAsNull() {
    dispatch({
      type: 'SET_CYCLE_ACTIVE_ID_AS_NULL',
      payload: { cycleActiveId },
    })
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
