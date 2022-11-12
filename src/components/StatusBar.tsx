import styled from 'styled-components'
import Timer from './Timer'

const StatusBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`

type Props = {
  text: string
}

const StatusBar = ({ text }: Props) => {
  return (
    <StatusBarContainer>
      <strong>{text}</strong>
      <Timer />
    </StatusBarContainer>
  )
}

export default StatusBar
