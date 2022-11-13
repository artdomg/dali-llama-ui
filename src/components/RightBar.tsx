import styled from 'styled-components'
import { useGame } from '../context/GameProvider'

const ScoreBoardContainer = styled.div`
  height: 55%;
  border-bottom: 1px solid #ebeced;

  h2 {
    margin-top: 30px;
    margin-left: 44px;
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 19px;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ebeced;
`

const PlayersGrid = styled.div`
  height: calc(100% - 42px);
  overflow-y: auto;

  & > div {
    display: flex;
    padding: 6px 30px;
    justify-content: space-between;

    .score {
      width: 60px;
      text-align: center;
    }

    &.active {
      background-color: #204ecf;
      color: #ffffff;
    }
  }
`

const PlayerName = styled.span`
  padding-left: 14px;
`

const RightBar = () => {
  const { players, round } = useGame()

  return (
    <div>
      <ScoreBoardContainer>
        <h2>Round {round}</h2>
        <Divider className='mb-3' />
        <PlayersGrid>
          <div>
            <strong>Players</strong>
            <strong className='score'>Points</strong>
          </div>
          {Object.values(players).map((player) => (
            <div className={player.isLeader ? 'active' : ''} key={player.id}>
              <PlayerName>{player.name}</PlayerName>
              <span className='score'>{player.score}</span>
            </div>
          ))}
        </PlayersGrid>
      </ScoreBoardContainer>
    </div>
  )
}

export default RightBar
