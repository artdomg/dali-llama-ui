import { useGame } from '../context/GameProvider'

const Timer = () => {
  const { timer } = useGame()

  return <div>{timer} sec</div>
}

export default Timer
