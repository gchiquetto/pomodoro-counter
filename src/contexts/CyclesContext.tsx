import { createContext, ReactNode, useState } from 'react'

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
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [cycleActiveId, setCycleActiveId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const cycleActive = cycles.find((cycle) => cycle.id === cycleActiveId)

  function markCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === cycleActiveId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function createNewCycle(data: CreateCycleData) {
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
    // reset()
  }

  function stopCycle() {
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

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function setActiveIdAsNull() {
    setCycleActiveId(null)
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
