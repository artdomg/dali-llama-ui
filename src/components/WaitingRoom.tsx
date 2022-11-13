import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'
import { useGame } from '../context/GameProvider'
import headerImage from '../assets/waitingRoomHeader.png'
import PlayerGrid from './PlayerGrid'

const HeaderContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;

  span {
    width: calc(33% - 36px);
  }

  button {
    width: 100%;
    height: 52px;
  }
`

const WaitingRoom = () => {
  const { players, startGame, status } = useGame()

  const totalPlayers = Object.values(players).length

  const canStart = totalPlayers > 1

  const gameEnded = status === 'ended'

  const startGameButton = (
    <span>
      <Button disabled={!canStart} onClick={startGame}>
        Start {gameEnded && 'New'} Game
      </Button>
    </span>
  )

  return (
    <div>
      <HeaderContainer>
        <img src={headerImage} alt='decorative' />
      </HeaderContainer>

      <p className='mx-5 mt-4'>
        Copy and share this link with your friends so they can join your game
      </p>

      <PlayerGrid />

      <ActionContainer>
        {!canStart ? (
          <OverlayTrigger
            placement='right'
            overlay={
              <Tooltip id='tooltip-start'>You need at least 3 players</Tooltip>
            }
          >
            {startGameButton}
          </OverlayTrigger>
        ) : (
          <span>{startGameButton}</span>
        )}
      </ActionContainer>
    </div>
  )
}

export default WaitingRoom
