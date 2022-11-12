import { Alert, Button, Form } from 'react-bootstrap';
import { useAsyncCallback } from 'react-async-hook';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameProvider';
import { FormContainer } from '../components/FormContainer';
import { DEFAULT_PASS } from '../data/constants';
import { createRoom } from '../services/gameApi';

const Home = () => {
  const navigate = useNavigate();
  const { setMe, setToken } = useGame();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createRoomAsync = useAsyncCallback(async () => {
    if (password !== DEFAULT_PASS) throw new Error('Incorrect password');
    const response = await createRoom(username, password);
    const { token, playerId, roomId } = response.data;
    setMe(playerId);
    setToken(token);
    navigate(`/${roomId}`);
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <Form.Control
          required
          type="text"
          placeholder="Enter name"
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
        />
        <Form.Control
          required
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
        {createRoomAsync.error && (
          <Alert variant="danger">{createRoomAsync.error.message}</Alert>
        )}
        <Button
          type="submit"
          variant="dark"
          disabled={createRoomAsync.loading}
          onClick={createRoomAsync.execute}
        >
          Create Game
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Home;
