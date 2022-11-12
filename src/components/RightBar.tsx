import styled from 'styled-components'
import { useGame } from '../context/GameProvider'

const ScoreBoardContainer = styled.div`
  padding: 44px 30px;
  height: 55%;
  border-bottom: 1px solid #ebeced;

  h2 {
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
    display: grid;
    gap: 12px;
    grid-template-columns: 2fr 1fr;
  }
`

const PlayerName = styled.span`
  padding-left: 14px;
`

const RightBar = () => {
  const { players } = useGame()

  return (
    <div>
      <ScoreBoardContainer>
        <h2>Round 1</h2>
        <Divider className='mb-3' />
        <PlayersGrid>
          <div>
            <strong>Players</strong>
            <strong className='text-center'>Points</strong>
            {Object.values(players).map((player) => (
              <>
                <PlayerName key={`${player.id}_name`}>{player.name}</PlayerName>
                <span className='text-center' key={`${player.id}_points`}>
                  0
                </span>
              </>
            ))}
          </div>
        </PlayersGrid>
      </ScoreBoardContainer>
    </div>
  )
}

export default RightBar
