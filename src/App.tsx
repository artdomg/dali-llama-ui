import { Route, Routes } from 'react-router-dom'
import { GameProvider } from './context/GameProvider'
import Home from './pages/Home'
import Room from './pages/Room'

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path='/:roomId' element={<Room />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </GameProvider>
  )
}

export default App
