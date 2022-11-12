import styled from 'styled-components'
import { useGame } from '../context/GameProvider'

const Player = styled.div`
  border: 1px solid #ebeced;
  border-radius: 8px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
`

const PlayerList = () => {
  const { players } = useGame()

  return (
    <>
      {Object.values(players).map((player) => (
        <Player key={player.name}>{player.name}</Player>
      ))}
    </>
  )
}

export default PlayerList
