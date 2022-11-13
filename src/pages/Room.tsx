import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Container from '../components/Container'
import Game from '../components/Game'
import NameInput from '../components/NameInput'
import RightBar from '../components/RightBar'
import TopBar from '../components/TopBar'
import WaitingRoom from '../components/WaitingRoom'
import { useGame } from '../context/GameProvider'

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  &.shaking {
    animation: shake 0.5s;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`
const GameContainer = styled(Container)`
  min-height: calc(100vh - 60px);
  padding: 30px 40px;
  display: flex;
  gap: 44px;

  & > * {
    max-width: 100%;
    min-height: 100%;
    background: #ffffff;
    border: 1px solid #ebeced;
    border-radius: 8px;
  }

  & > *:first-child {
    width: 916px;
  }

  & > *:last-child {
    width: 320px;
  }
`

const Room = () => {
  const { token, setRoom, status, shaking } = useGame()
  const { roomId } = useParams()

  useEffect(() => {
    setRoom(roomId as string)
  }, [roomId, setRoom])

  let component = null
  if (!token) {
    return <NameInput />
  }

  if (status === 'waiting') {
    component = <WaitingRoom />
  } else if (status === 'started') {
    component = <Game />
  } else {
    component = <WaitingRoom />
  }

  return (
    <RoomContainer className={shaking ? 'shaking' : ''}>
      <TopBar />
      <GameContainer>
        {component}
        <RightBar />
      </GameContainer>
    </RoomContainer>
  )
}

export default Room
