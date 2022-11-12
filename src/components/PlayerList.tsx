import { useGame } from '../context/GameProvider';

const PlayerList = () => {
  const { players } = useGame();

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {Object.values(players).map((player) => (
          <li key={player.name}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
