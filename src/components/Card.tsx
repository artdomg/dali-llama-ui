import styled from 'styled-components';
import { CardType } from '../context/GameProvider';

const CardContainer = styled.div`
  padding: 20px;
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
  width: 185px;
  height: 230px;
  border-radius: 12px;
  border: 3px solid #ffffff;
`;

type Props = {
  card: CardType;
};

const Card = ({ card }: Props) => {
  return <CardContainer>{card.text}</CardContainer>;
};

export default Card;
