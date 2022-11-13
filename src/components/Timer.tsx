import { useEffect, useState } from 'react'
import { useGame } from '../context/GameProvider'

const Timer = () => {
  const { timer } = useGame()
  const [localTimer, setLocalTimer] = useState(timer)

  useEffect(() => {
    if (!timer) return
    setLocalTimer(timer)
  }, [timer])

  useEffect(() => {
    const interval = setInterval(
      () => setLocalTimer((value) => value - 1),
      1000
    )
    return () => clearInterval(interval)
  }, [])

  return <div>{localTimer} sec</div>
}

export default Timer
