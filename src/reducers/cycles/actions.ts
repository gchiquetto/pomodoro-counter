import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CYCLE = 'STOP_CYCLE',
  MARK_CYCLE_AS_FINISHED = 'MARK_CYCLE_AS_FINISHED',
  SET_CYCLE_ACTIVE_ID_AS_NULL = 'SET_CYCLE_ACTIVE_ID_AS_NULL',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}

export function stopCycleAction() {
  return {
    type: ActionTypes.STOP_CYCLE,
    payload: null,
  }
}

export function markCycleAsFinishedAction(cycleActiveId: string | null) {
  return {
    type: ActionTypes.MARK_CYCLE_AS_FINISHED,
    payload: { cycleActiveId },
  }
}

export function setCycleActiveIdAsNull(cycleActiveId: string | null) {
  return {
    type: ActionTypes.SET_CYCLE_ACTIVE_ID_AS_NULL,
    payload: { cycleActiveId },
  }
}
