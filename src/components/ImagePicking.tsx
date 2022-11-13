import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useAsyncCallback } from 'react-async-hook'
import { useGame } from '../context/GameProvider'
import Card from './Card'
import { useState } from 'react'
import styled from 'styled-components'
import { generateImages } from '../services/imageApi'
import StatusBar from './StatusBar'

const PickerContainer = styled.div`
  padding: 30px 40px;

  p {
    font-weight: bold;
    margin-top: 20px;
  }
`

const ImageList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 25px;
  margin-top: 30px;

  & > div {
    aspect-ratio: 1/1;
    cursor: pointer;

    &.selected {
      border: 2px solid #000000;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const ImagePicking = () => {
  const { isLeader, currentPrompt, currentTurn, players, me, sendChoice } =
    useGame()
  const [selectedUrl, setSelectedUrl] = useState('')
  const [text, setText] = useState('')
  const [query, setQuery] = useState('')

  const sendImage = (image: string) => {
    sendChoice(query, image)
    setSelectedUrl(image)
  }

  const fetchImageAsync = useAsyncCallback(async () => {
    const result = await generateImages(text)
    setQuery(text)
    setSelectedUrl('')
    return result.data
  })

  const images: string[] = fetchImageAsync.result?.images || []

  return (
    <PickerContainer>
      <StatusBar
        text={
          isLeader
            ? 'Waiting for followers'
            : `${players[currentTurn].name}'s prompt:`
        }
      />
      {!isLeader && (
        <div>
          {selectedUrl ? (
            <p>Waiting for other players</p>
          ) : (
            <>
              <Card card={currentPrompt} />

              <p>
                {players[me].name}, enter your answer, click draw and select an
                image:
              </p>

              <Form onSubmit={(e) => e.preventDefault()}>
                <InputGroup>
                  <Form.Control
                    type='text'
                    placeholder='Arnold Schwarzenegger in samurai armor kicking ass'
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                  />
                  <Button
                    type='submit'
                    onClick={fetchImageAsync.execute}
                    disabled={fetchImageAsync.loading || !text}
                  >
                    {fetchImageAsync.loading && (
                      <Spinner animation='border' size='sm' />
                    )}{' '}
                    Draw
                  </Button>
                </InputGroup>
              </Form>
              <ImageList>
                {!fetchImageAsync.loading &&
                  images.map((image) => (
                    <div
                      key={image}
                      className={selectedUrl === image ? 'selected' : ''}
                      onClick={() => {
                        sendImage(image)
                      }}
                    >
                      <img key={image} src={image} alt='prompt option' />
                    </div>
                  ))}
              </ImageList>
            </>
          )}
        </div>
      )}
    </PickerContainer>
  )
}

export default ImagePicking
