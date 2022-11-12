import { useState } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { Button, Form } from 'react-bootstrap'
import { useGame } from '../context/GameProvider'
import { joinRoom } from '../services/gameApi'
import { FormContainer } from './FormContainer'

const NameInput = () => {
  const { setToken, room, setMe } = useGame()
  const [username, setUsername] = useState('')

  const onSubmitAsync = useAsyncCallback(async () => {
    const response = await joinRoom(room, username)
    const { token, playerId } = response.data
    setMe(playerId)
    setToken(token)
  })

  return (
    <FormContainer>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          required
          type='text'
          placeholder='Enter name'
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Button
          type='submit'
          variant='dark'
          onClick={onSubmitAsync.execute}
          disabled={onSubmitAsync.loading || !username}
        >
          Join
        </Button>
      </Form>
    </FormContainer>
  )
}

export default NameInput
