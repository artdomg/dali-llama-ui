import styled from 'styled-components'
import { useGame } from '../context/GameProvider'
import StatusBar from './StatusBar'

const WinnerContainer = styled.div`
  padding: 30px 40px;

  p {
    font-weight: bold;
    margin-top: 20px;
  }
`

const ImageContainer = styled.div`
  text-align: center;
  margin-top: 40px;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
`

const Winner = () => {
  const { currentTurn, players, currentPrompt, winner } = useGame()

  return (
    <WinnerContainer>
      <StatusBar
        text={`${players[currentTurn].name} which image best answers your prompt?`}
      />

      <p>{currentPrompt.text}</p>

      <h3 className='text-center mt-5'>Congrats {winner?.name}!</h3>
      <p className='text-center'>
        {players[currentTurn].name} chose your answer!
      </p>

      <ImageContainer>
        <img src={winner?.choiceUrl} alt='winner' />
      </ImageContainer>
    </WinnerContainer>
  )
}

export default Winner
