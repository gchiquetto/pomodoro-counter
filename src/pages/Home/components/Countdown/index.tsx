import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    cycleActive,
    cycleActiveId,
    amountSecondsPassed,
    markCycleAsFinished,
    setSecondsPassed,
    setActiveIdAsNull,
  } = useContext(CyclesContext)

  const totalSeconds = cycleActive ? cycleActive.minutesAmount * 60 : 0
  const currentSeconds = cycleActive ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (cycleActive) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          cycleActive.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          markCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
          setActiveIdAsNull()
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    cycleActive,
    totalSeconds,
    cycleActiveId,
    markCycleAsFinished,
    setSecondsPassed,
    setActiveIdAsNull,
  ])

  // Show the time on browser tab
  useEffect(() => {
    if (cycleActive) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Pomodoro Counter - Ignite'
    }
  }, [minutes, seconds, cycleActive])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
