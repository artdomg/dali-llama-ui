import { useEffect, useState } from 'react'
import styled from 'styled-components'
import copyIcon from '../assets/copyIcon.svg'

const Container = styled.div`
  grid-column: 1 / 3;
  background: #f3f4f6;
  border: 1px solid #ebeced;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  height: 63px;
  font-size: 14px;

  img {
    cursor: pointer;
  }
`

const GameUrl = () => {
  const [urlCopied, setUrlCopied] = useState(false)
  // eslint-disable-next-line no-restricted-globals
  const url = location.href

  useEffect(() => {
    if (urlCopied) {
      setTimeout(() => setUrlCopied(false), 3000)
    }
  }, [urlCopied])

  return (
    <Container>
      <strong>{url}</strong>
      {urlCopied ? (
        <small>Copied!</small>
      ) : (
        <img
          src={copyIcon}
          onClick={() => {
            navigator.clipboard.writeText(url)
            setUrlCopied(true)
          }}
          title='Copy text'
          alt='Copy text'
        />
      )}
    </Container>
  )
}

export default GameUrl
