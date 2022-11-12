import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { defaultCards } from '../data/cards'

const Context = createContext(undefined as any)

type Player = {
  id: string
  name: string
}

type PlayerCollection = {
  [id: string]: Player
}

type GameStatus = 'waiting' | 'started' | 'ended'

type Phase = 'prompt' | 'image_picking' | 'voting'

export type CardType = {
  id: number
  text: string
}

type GameContext = {
  status: GameStatus
  setStatus: (status: GameStatus) => void
  room: string
  setRoom: (room: string) => void
  players: PlayerCollection
  currentTurn: string
  phase: Phase
  me: string
  setMe: (id: string) => void
  availableCards: CardType[]
  totalCardsToShow: number
  isLeader: boolean
  currentPrompt: CardType
  setToken: (token: string) => void
  token: string
}

export const useGame = (): GameContext => useContext(Context)

type Props = {
  children: React.ReactNode
}

export const GameProvider = ({ children }: Props) => {
  const [room, setRoom] = useState('')
  const [status, setStatus] = useState<GameStatus>('waiting')
  const [socket, setSocket] = useState<Socket | undefined>(undefined)
  const [token, setToken] = useState('')
  const [me, setMe] = useState<string>('')
  const [players, setPlayers] = useState<PlayerCollection>({})
  const [currentPrompt, setCurrentPrompt] = useState<CardType>({
    id: 1,
    text: '',
  })
  const [currentTurn, setCurrentTurn] = useState('')
  const [phase, setPhase] = useState<Phase>('prompt')
  const [availableCards, setAvailableCards] = useState(defaultCards)
  const [totalCardsToShow, setTotalCardsToShow] = useState(3)

  useEffect(() => {
    if (!token || socket) return
    const socketConnection = io(process.env['REACT_APP_WS_URL'] as string, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    })

    socketConnection.on('connect', () => {
      console.log('Socket connected')
    })

    socketConnection.on('state', (data) => {
      console.log(data)
    })

    setSocket(socketConnection)
  }, [token, socket])

  const isLeader = useMemo(() => {
    return currentTurn === players[me]?.id
  }, [me, currentTurn, players])

  const value: GameContext = {
    status,
    setStatus,
    room,
    setRoom,
    players,
    currentTurn,
    phase,
    me,
    setMe,
    availableCards,
    totalCardsToShow,
    isLeader,
    currentPrompt,
    setToken,
    token,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
