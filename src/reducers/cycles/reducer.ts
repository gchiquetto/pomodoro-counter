import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopedDate?: Date
  finishedDate?: Date
}

interface CyclesSate {
  cycles: Cycle[]
  cycleActiveId: string | null
}

export function cyclesReducer(state: CyclesSate, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        cycleActiveId: action.payload.newCycle.id,
      }
    case ActionTypes.STOP_CYCLE:
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
    case ActionTypes.MARK_CYCLE_AS_FINISHED:
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
    case ActionTypes.SET_CYCLE_ACTIVE_ID_AS_NULL:
      return {
        ...state,
        cycles: [...state.cycles],
        cycleActiveId: action.payload,
      }
    default:
      return state
  }
}
