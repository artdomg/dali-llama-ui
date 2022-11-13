import { useMemo } from 'react'
import { useGame } from '../context/GameProvider'
import Player from './Player'

const PlayerList = () => {
  const { players, status } = useGame()

  const medals = useMemo(() => {
    const maxScore = Object.values(players).reduce((acum, player) => {
      if (player.score > acum) return player.score
      return acum
    }, 0)
    return Object.values(players).reduce(
      (acum: Record<string, boolean>, player) => {
        acum[player.id] = status === 'ended' && player.score >= maxScore
        return acum
      },
      {}
    )
  }, [players, status])

  return (
    <>
      {Object.values(players).map((player) => (
        <Player
          key={player.name}
          player={player}
          showMedal={medals[player.id]}
        />
      ))}
    </>
  )
}

export default PlayerList
