import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Game from '../components/Game';
import NameInput from '../components/NameInput';
import WaitingRoom from '../components/WaitingRoom';
import { useGame } from '../context/GameProvider';

const Room = () => {
  const { token, setRoom, status } = useGame();
  const { roomId } = useParams();

  useEffect(() => {
    setRoom(roomId as string);
  }, [roomId, setRoom]);

  if (!token) {
    return <NameInput />;
  } else if (status === 'waiting') {
    return <WaitingRoom />;
  } else if (status === 'started') {
    return <Game />;
  } else {
    return <div>End</div>;
  }
};

export default Room;
