import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

const Context = createContext(undefined as any)

export type Player = {
  id: string
  name: string
  score: number
  isLeader: boolean
  choicePrompt?: string
  choiceUrl?: string
}

type Winner = {
  choiceUrl: string
  name: string
}

type PlayerCollection = {
  [id: string]: Player
}

type GameStatus = 'waiting' | 'started' | 'ended'

type Phase = 'prompt' | 'image_picking' | 'voting' | 'winner'

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
  isLeader: boolean
  currentPrompt: CardType
  setToken: (token: string) => void
  token: string
  startGame: () => void
  timerId: string
  timer: number
  sendPrompt: (prompt: string) => void
  sendChoice: (choicePrompt: string, choiceUrl: string) => void
  sendLeaderChoice: (playerId: string) => void
  round: number
  winner?: Winner
  sendMessage: (text: string) => void
  messages: Message[]
}

type Message = {
  id: string
  playerName: string
  text: string
}

export const useGame = (): GameContext => useContext(Context)

type Props = {
  children: React.ReactNode
}

const serverStatusMap: any = {
  playing_leader_prompt: 'prompt',
  playing_follower_prompt: 'image_picking',
  playing_leader_choice: 'voting',
  showing_winner: 'winner',
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
  const [availableCards, setAvailableCards] = useState<CardType[]>([])
  const [timer, setTimer] = useState(0)
  const [timerId, setTimerId] = useState('')
  const [round, setRound] = useState(1)
  const [winner, setWinner] = useState<Winner | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([])

  const handleGameStateChange = (data: any) => {
    console.log('State', data)
    const {
      leaderIndex,
      players,
      phase,
      roundIndex,
      timerId,
      timer,
      leaderPromptOptions,
      leaderPrompt,
      winner,
      messages,
    } = data

    const playersById = players.reduce((acum: any, player: any) => {
      acum[player.id] = player
      return acum
    }, {})
    setPlayers(playersById)

    const leaderId = players[leaderIndex]?.id
    setCurrentTurn(leaderId)
    setTimerId(timerId)
    setTimer(timer)
    setAvailableCards(leaderPromptOptions)
    setCurrentPrompt({ id: 1, text: leaderPrompt })
    setRound(roundIndex + 1)
    setWinner(winner)
    if (messages) {
      setMessages(messages)
    } else {
      setMessages([])
    }

    if (phase === 'waiting') {
      if (leaderIndex !== 0) {
        setStatus('ended')
      } else {
        setStatus('waiting')
      }
      setPhase('prompt')
    } else {
      setStatus('started')
      setPhase(serverStatusMap[phase] as Phase)
    }
  }

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

    socketConnection.on('state', handleGameStateChange)

    setSocket(socketConnection)
  }, [token, socket])

  const isLeader = useMemo(() => {
    return currentTurn === players[me]?.id
  }, [me, currentTurn, players])

  const startGame = useCallback(() => {
    const options: any = {}
    if (process.env['REACT_APP_LOCAL'] === 'yes') {
      options.disableTimers = true
    }
    socket?.emit('start-game', options)
  }, [socket])

  const sendPrompt = useCallback(
    (prompt: string) => {
      socket?.emit('leader-prompt', prompt)
    },
    [socket]
  )

  const sendChoice = useCallback(
    (choicePrompt: string, choiceUrl: string) => {
      socket?.emit('follower-choice', { choicePrompt, choiceUrl })
    },
    [socket]
  )

  const sendLeaderChoice = useCallback(
    (playerId: string) => {
      socket?.emit('leader-choice', playerId)
    },
    [socket]
  )

  const sendMessage = useCallback(
    (text: string) => {
      socket?.emit('chat-message', text)
    },
    [socket]
  )

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
    isLeader,
    currentPrompt,
    setToken,
    token,
    startGame,
    timerId,
    timer,
    sendPrompt,
    sendChoice,
    sendLeaderChoice,
    round,
    winner,
    sendMessage,
    messages,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
