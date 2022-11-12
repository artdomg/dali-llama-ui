import { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { Button, Form } from 'react-bootstrap';
import { useGame } from '../context/GameProvider';
import { FormContainer } from './FormContainer';

const NameInput = () => {
  const { setToken } = useGame();
  const [username, setUsername] = useState('');

  const onSubmitAsync = useAsyncCallback(async () => {
    // TODO: Join game
  });

  return (
    <FormContainer>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          required
          type="text"
          placeholder="Enter name"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Button type="submit" variant="dark" onClick={onSubmitAsync.execute}>
          Join
        </Button>
      </Form>
    </FormContainer>
  );
};

export default NameInput;
