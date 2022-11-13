import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { useGame } from '../context/GameProvider'
import Card from './Card'
import StatusBar from './StatusBar'

const CardsList = styled.div`
  display: flex;
  gap: 25px;
`

const PromptContainer = styled.div`
  padding: 30px 40px;

  p {
    font-weight: bold;
    margin-top: 20px;
  }
`

const UnknownCard = styled.div`
  width: 266px;
  height: 266px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: #000000;
  font-size: 120px;
  font-weight: bold;
`

const Prompt = () => {
  const { availableCards, currentTurn, players, isLeader, sendPrompt } =
    useGame()
  const [prompt, setPrompt] = useState('')

  const onSendPrompt = () => {
    if (!prompt) return
    sendPrompt(prompt)
  }

  return (
    <PromptContainer>
      <StatusBar
        text={
          isLeader
            ? `${players[currentTurn].name}, it's your turn. Please choose a prompt:`
            : `${players[currentTurn].name} is choosing his prompt`
        }
      />
      {isLeader ? (
        <div>
          <CardsList>
            {availableCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onClick={() => sendPrompt(card.text)}
              />
            ))}
          </CardsList>
          <p>Or</p>
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <Form.Control
                type='text'
                placeholder='My favorite soccer team is...'
                value={prompt}
                onChange={(e) => setPrompt(e.currentTarget.value)}
              />
              <Button type='submit' onClick={onSendPrompt} disabled={!prompt}>
                Submit prompt
              </Button>
            </InputGroup>
          </Form>

          {prompt && (
            <div className='mt-4'>
              <Card card={{ id: 1, text: prompt }} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <UnknownCard>?</UnknownCard>
        </div>
      )}
    </PromptContainer>
  )
}

export default Prompt
