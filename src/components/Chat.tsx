import { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useGame } from '../context/GameProvider'

const ChatContainer = styled.div`
  height: 100%;
  width: 100%;

  input {
    border-radius: 0 0 8px 8px;
  }
`

const MessagesContainer = styled.div`
  height: calc(100% - 67px);
  width: 100%;
  overflow-y: auto;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const InputBox = styled.div``

const PlayerName = styled.strong`
  color: #204ecf;
`

const Chat = () => {
  const { sendMessage, messages, setShaking } = useGame()
  const [text, setText] = useState('')
  const messagesContainer = useRef(null)

  useEffect(() => {
    const element: HTMLElement = messagesContainer.current as any
    element.scrollTo(0, element.offsetHeight)
  }, [messages.length])

  useEffect(() => {
    const text = messages[messages.length - 1]?.text
    if (text !== 'shake it' && text !== 'hurry up') return setShaking(false)
    setShaking(true)
  }, [messages[messages.length - 1]?.text])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return
    sendMessage(text)
    setText('')
  }

  return (
    <ChatContainer>
      <MessagesContainer ref={messagesContainer}>
        {messages.map((message) => (
          <div key={message.id}>
            <PlayerName>{message.playerName}:</PlayerName> {message.text}
          </div>
        ))}
      </MessagesContainer>
      <InputBox>
        <Form onSubmit={onSubmit}>
          <Form.Control
            type='text'
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder='Send a message...'
          />
        </Form>
      </InputBox>
    </ChatContainer>
  )
}

export default Chat
