import { useGame } from '../context/GameProvider';
import ImagePicking from './ImagePicking';
import Prompt from './Prompt';
import Voting from './Voting';

const Game = () => {
  const { phase } = useGame();

  if (phase === 'prompt') {
    return <Prompt />;
  } else if (phase === 'image_picking') {
    return <ImagePicking />;
  } else {
    return <Voting />;
  }
};

export default Game;
