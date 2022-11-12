import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Container from '../components/Container'
import Game from '../components/Game'
import NameInput from '../components/NameInput'
import ScoreBoard from '../components/ScoreBoard'
import TopBar from '../components/TopBar'
import WaitingRoom from '../components/WaitingRoom'
import { useGame } from '../context/GameProvider'

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const GameContainer = styled(Container)`
  height: calc(100vh - 60px);
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
  const { token, setRoom, status } = useGame()
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
    component = <div>End</div>
  }

  return (
    <RoomContainer>
      <TopBar />
      <GameContainer>
        {component}
        <ScoreBoard />
      </GameContainer>
    </RoomContainer>
  )
}

export default Room
