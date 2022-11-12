import { useMemo } from 'react'
import styled from 'styled-components'
import { CardType, useGame } from '../context/GameProvider'
import Card from './Card'
import Timer from './Timer'

const pickRandomCard = (cards: CardType[]) => {
  return Math.floor(Math.random() * cards.length)
}

const CardsList = styled.div`
  display: flex;
  gap: 25px;
`

const PromptContainer = styled.div`
  padding: 30px 40px;
`

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
`

const Prompt = () => {
  const { availableCards, currentTurn, totalCardsToShow, players, isLeader } =
    useGame()

  const cards = useMemo(() => {
    const remainingCards = [...availableCards]
    const selectedCards = []
    while (
      selectedCards.length < totalCardsToShow &&
      remainingCards.length > 0
    ) {
      const index = pickRandomCard(remainingCards)
      selectedCards.push(remainingCards[index])
      remainingCards.splice(index, 1)
    }
    return selectedCards
  }, [availableCards, totalCardsToShow])

  return (
    <PromptContainer>
      <StatusBar>
        <strong>
          {isLeader
            ? `${players[currentTurn].name}, it's your turn. Please choose a prompt:`
            : `${players[currentTurn].name} is choosing his prompt`}
        </strong>
        <Timer />
      </StatusBar>
      {isLeader ? (
        <div>
          <CardsList>
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </CardsList>
        </div>
      ) : (
        <div>Waiting for {players[currentTurn].name}</div>
      )}
    </PromptContainer>
  )
}

export default Prompt
