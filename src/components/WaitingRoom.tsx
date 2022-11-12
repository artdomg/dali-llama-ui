import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useGame } from '../context/GameProvider';
import GameUrl from './GameUrl';
import PlayerList from './PlayerList';

const WaitingRoom = () => {
  const { players } = useGame();

  const totalPlayers = Object.values(players).length;

  const startGameButton = (
    <span>
      <Button disabled={totalPlayers < 3} variant="dark">
        Start Game
      </Button>
    </span>
  );

  return (
    <div className="px-3 py-3">
      <GameUrl />
      <PlayerList />
      {totalPlayers < 3 ? (
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="tooltip-start">You need at least 3 players</Tooltip>
          }
        >
          {startGameButton}
        </OverlayTrigger>
      ) : (
        startGameButton
      )}
    </div>
  );
};

export default WaitingRoom;
