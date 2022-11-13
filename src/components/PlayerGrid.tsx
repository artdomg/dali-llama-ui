import styled from 'styled-components'
import GameUrl from './GameUrl'
import PlayerList from './PlayerList'

const PlayerGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 19px;
  margin: 26px 40px;
`

const PlayerGrid = () => {
  return (
    <PlayerGridContainer>
      <GameUrl />
      <PlayerList />
    </PlayerGridContainer>
  )
}

export default PlayerGrid
