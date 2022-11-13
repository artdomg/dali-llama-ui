import { useEffect, useState } from 'react'
import { useGame } from '../context/GameProvider'
import animationData from '../assets/timer.json'
import Lottie from 'lottie-react'
import styled from 'styled-components'

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Clock = styled.div`
  width: 30px;
  height: 30px;
`

let lastTimerId = ''

const Timer = () => {
  const { timer, timerId } = useGame()
  const [localTimer, setLocalTimer] = useState(timer)

  useEffect(() => {
    if (!timer || !timerId || timerId === lastTimerId) return
    lastTimerId = timerId
    setLocalTimer(timer)
  }, [timer, timerId])

  useEffect(() => {
    const interval = setInterval(
      () => setLocalTimer((value) => (value - 1 < 0 ? 0 : value - 1)),
      1000
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <TimerContainer>
      <Clock>
        <Lottie animationData={animationData} loop />
      </Clock>
      <span>{localTimer} sec</span>
    </TimerContainer>
  )
}

export default Timer
