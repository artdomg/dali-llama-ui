import styled from 'styled-components'
import { useGame } from '../context/GameProvider'
import toptalIcon from '../assets/toptalIcon.svg'
import Chat from './Chat'

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

const ChatContainer = styled.div`
  height: 45%;
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
      padding-left: 18px;

      .playerName {
        padding-left: 0;
      }
    }

    .playerName {
      padding-left: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
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
              <span className='playerName'>
                {player.isLeader && (
                  <img src={toptalIcon} width='14' alt='toptal icon' />
                )}{' '}
                {player.name}
              </span>
              <span className='score'>{player.score}</span>
            </div>
          ))}
        </PlayersGrid>
      </ScoreBoardContainer>
      <ChatContainer>
        <Chat />
      </ChatContainer>
    </div>
  )
}

export default RightBar
