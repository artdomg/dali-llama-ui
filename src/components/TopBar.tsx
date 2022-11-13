import styled from 'styled-components'
import Container from './Container'
import logo from '../assets/logo.png'
import configIcon from '../assets/configIcon.svg'
import leaderboardIcon from '../assets/leaderboardIcon.svg'
import userIcon from '../assets/user.png'

const TopBarContainer = styled.div`
  width: 100%;
  background-color: #204ecf;
  color: #ffffff;
  border-bottom: 1px solid #ebeced;
`

const Content = styled(Container)`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Menu = styled.div`
  display: flex;
  gap: 50px;

  img {
    width: 30px;
    height: 30px;
  }
`

const LeaderboardContainer = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`

const TopBar = () => {
  return (
    <TopBarContainer>
      <Content>
        <img src={logo} width='40' height='40' />
        <Menu>
          <img src={userIcon} />
          <LeaderboardContainer>
            <img src={leaderboardIcon} width='22' height='22' /> Leaderboard
          </LeaderboardContainer>
          <div>
            <img src={configIcon} width='22' height='22' />
          </div>
        </Menu>
      </Content>
    </TopBarContainer>
  )
}

export default TopBar
