import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useAsyncCallback } from 'react-async-hook';
import { useGame } from '../context/GameProvider';
import Card from './Card';
import { useState } from 'react';
import styled from 'styled-components';

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
`;

const ImagePicking = () => {
  const { isLeader, currentPrompt } = useGame();
  const [selectedUrl, setSelectedUrl] = useState('');
  const [text, setText] = useState('');

  const sendImage = () => {
    // TODO: Send image
  };

  const fetchImageAsync = useAsyncCallback(async () => {
    // TODO: Fetch images
    setText('');
    setSelectedUrl('');
    return {
      image_urls: [
        { url: 'https://cdn.mos.cms.futurecdn.net/CAZ6JXi6huSuN4QGE627NR.jpg' },
        {
          url: 'https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg',
        },
        {
          url: 'https://imageio.forbes.com/specials-images/imageserve/62d189da4c79a6e907c4a0f6/Selling-employee-stock-when-it-s-down/960x0.jpg?format=jpg&width=960',
        },
        {
          url: 'https://techcrunch.com/wp-content/uploads/2022/06/Weird-Stock-Photography-Haje-Kamps-websize.jpeg',
        },
      ],
    };
  });

  const images = fetchImageAsync.result?.image_urls || [];

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
                type="text"
                placeholder="Purple unicorn holding light sabers"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <Button
                type="submit"
                variant="dark"
                onClick={fetchImageAsync.execute}
                disabled={fetchImageAsync.loading || !text}
              >
                Draw
              </Button>
            </InputGroup>
          </Form>
          <ImageList>
            {fetchImageAsync.loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                {images.map((image) => (
                  <div
                    className={selectedUrl === image.url ? 'selected' : ''}
                    onClick={() => {
                      setSelectedUrl(image.url);
                    }}
                  >
                    <img key={image.url} src={image.url} />
                  </div>
                ))}
              </>
            )}
          </ImageList>
          {selectedUrl && (
            <Button onClick={sendImage} variant="dark">
              Send
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagePicking;
