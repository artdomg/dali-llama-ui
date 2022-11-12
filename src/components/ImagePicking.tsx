import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useAsyncCallback } from 'react-async-hook'
import { useGame } from '../context/GameProvider'
import Card from './Card'
import { useState } from 'react'
import styled from 'styled-components'
import { generateImages } from '../services/imageApi'

const ImageList = styled.div`
  display: flex;
  gap: 25px;

  & > div {
    width: 230px;
    height: 230px;
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
  const { isLeader, currentPrompt } = useGame()
  const [selectedUrl, setSelectedUrl] = useState('')
  const [text, setText] = useState('')

  const sendImage = () => {
    // TODO: Send image
  }

  const fetchImageAsync = useAsyncCallback(async () => {
    // TODO: Fetch images
    const result = await generateImages(text)
    setText('')
    setSelectedUrl('')
    return result.data
  })

  const images: string[] = fetchImageAsync.result?.images || []

  return (
    <div>
      {isLeader ? (
        <div>Waiting for followers</div>
      ) : (
        <div>
          <Card card={currentPrompt} />
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <Form.Control
                type='text'
                placeholder='Purple unicorn holding light sabers'
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <Button
                type='submit'
                variant='dark'
                onClick={fetchImageAsync.execute}
                disabled={fetchImageAsync.loading || !text}
              >
                Draw
              </Button>
            </InputGroup>
          </Form>
          <ImageList>
            {fetchImageAsync.loading ? (
              <Spinner animation='border' />
            ) : (
              <>
                {images.map((image) => (
                  <div
                    className={selectedUrl === image ? 'selected' : ''}
                    onClick={() => {
                      setSelectedUrl(image)
                    }}
                  >
                    <img key={image} src={image} />
                  </div>
                ))}
              </>
            )}
          </ImageList>
          {selectedUrl && (
            <Button onClick={sendImage} variant='dark'>
              Send
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default ImagePicking
