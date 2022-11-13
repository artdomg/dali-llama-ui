import styled from 'styled-components'
import { Player, useGame } from '../context/GameProvider'
import toptalMedal from '../assets/toptalMedal.svg'

const PlayerContainer = styled.div`
  border: 1px solid #ebeced;
  border-radius: 8px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
`

const Score = styled.div`
  color: #204ecf;
  font-weight: bold;
  font-size: 16px;
`

const Medal = styled.div`
  position: absolute;
  top: -2px;
  left: 6px;
  z-index: 10;
`

type Props = {
  player: Player
  showMedal?: boolean
}

const PlayerComponent = ({ player, showMedal }: Props) => {
  const { status } = useGame()

  const gameEnded = status === 'ended'

  return (
    <PlayerContainer>
      {showMedal && (
        <Medal>
          <img src={toptalMedal} alt='medal' />
        </Medal>
      )}
      <div>{player.name}</div>
      {gameEnded && <Score>{player.score}</Score>}
    </PlayerContainer>
  )
}

export default PlayerComponent
