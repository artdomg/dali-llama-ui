import { useGame } from '../context/GameProvider'
import ImagePicking from './ImagePicking'
import Prompt from './Prompt'
import Voting from './Voting'
import Winner from './Winner'

const Game = () => {
  const { phase } = useGame()

  if (phase === 'prompt') {
    return <Prompt />
  } else if (phase === 'image_picking') {
    return <ImagePicking />
  } else if (phase === 'voting') {
    return <Voting />
  } else {
    return <Winner />
  }
}

export default Game
