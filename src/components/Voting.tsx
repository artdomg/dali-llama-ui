import styled from 'styled-components'
import { useGame } from '../context/GameProvider'
import StatusBar from './StatusBar'

const VotingContainer = styled.div`
  padding: 30px 40px;

  p {
    font-weight: bold;
    margin-top: 20px;
  }
`

const ImagesContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  div.enabled {
    cursor: pointer;
  }
`

const Voting = () => {
  const { currentTurn, players, isLeader, sendLeaderChoice } = useGame()

  return (
    <VotingContainer>
      <StatusBar
        text={
          isLeader
            ? 'Choose a prompt'
            : `${players[currentTurn].name} is choosing his prompt`
        }
      />
      <ImagesContainer>
        {Object.values(players)
          .filter((player) => !!player.choiceUrl)
          .map((player) => (
            <div
              key={player.id}
              className={isLeader ? 'enabled' : ''}
              onClick={isLeader ? () => sendLeaderChoice(player.id) : undefined}
            >
              <img src={player.choiceUrl} alt='choice' />
            </div>
          ))}
      </ImagesContainer>
    </VotingContainer>
  )
}

export default Voting
