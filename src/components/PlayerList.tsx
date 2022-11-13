import { useMemo } from 'react'
import { Player as PlayerType, useGame } from '../context/GameProvider'
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

  const sortPlayers = (p1: PlayerType, p2: PlayerType) => {
    if (p1.score < p2.score) return 1
    if (p1.score > p2.score) return -1
    if (p1.name.toLowerCase() > p2.name.toLowerCase()) return 1
    if (p1.name.toLowerCase() < p2.name.toLowerCase()) return -1
    return 0
  }

  return (
    <>
      {Object.values(players)
        .sort(sortPlayers)
        .map((player) => (
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
