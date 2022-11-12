import { ReactNode } from 'react'
import styled from 'styled-components'
import headerImage from '../assets/formHeader.png'

const FormContainer = styled.div`
  height: 100vh;
  width: 650px;
  max-width: 100vw;
  display: flex;
  align-items: center;
  margin: auto;

  & > div {
    width: 100%;
    max-height: 100vh;
    height: 630px;
    border: 1px solid #ebeced;
    border-radius: 8px;
    background-color: #ffffff;

    img {
      width: 100%;
    }
  }

  form {
    width: 100%;
    max-width: 280px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin: auto;
  }

  h1 {
    font-size: 26px;
    line-height: 31px;
    text-align: center;
    margin-top: 66px;
    margin-bottom: 50px;
  }

  button {
    margin-top: 15px;
  }
`

type Props = {
  children: ReactNode
}

const FormWrapper = ({ children }: Props) => {
  return (
    <FormContainer>
      <div>
        <div>
          <img src={headerImage} />
        </div>
        {children}
      </div>
    </FormContainer>
  )
}

export default FormWrapper
