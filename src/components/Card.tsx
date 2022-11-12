import styled from 'styled-components'
import { CardType } from '../context/GameProvider'
import bg1 from '../assets/cardBg01.png'
import bg2 from '../assets/cardBg02.png'
import bg3 from '../assets/cardBg03.png'
import bg4 from '../assets/cardBg04.png'
import { useMemo } from 'react'

const CardContainer = styled.div`
  position: relative;
  padding: 20px;
  color: #ffffff;
  font-weight: bold;
  width: 33%;
  height: 250px;
  border-radius: 12px;
  border: 3px solid #ffffff;

  div:last-child {
    position: relative;
  }
`

const CardBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor
  }
`

const backgrounds = [bg1, bg2, bg3, bg4]

const getRandomBackground = () => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

type Props = {
  card: CardType
  onClick?: () => void
}

const Card = ({ card, onClick }: Props) => {
  const background = useMemo(getRandomBackground, [])

  return (
    <CardContainer
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'auto' }}
    >
      <CardBackground>
        <img src={background} alt='decoration' />
      </CardBackground>
      <div>{card.text}</div>
    </CardContainer>
  )
}

export default Card
