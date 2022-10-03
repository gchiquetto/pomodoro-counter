import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  display: flex;
  gap: 1rem;
  width: 100%;
  overflow: hidden;

  span {
    padding: 2rem 1rem;
    border-radius: 8px;
    background-color: ${(props) => props.theme['gray-700']};
  }

  @media (max-width: 768px) {
    font-size: 5rem;
    line-height: 4rem;
  }

  @media (max-width: 530px) {
    font-size: 4rem;
    line-height: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    line-height: 2rem;
  }

  @media (max-width: 430px) {
    font-size: 2.5rem;
    line-height: 1.5rem;
  }
`

export const Separator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: none;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 2rem;
  }

  @media (max-width: 530px) {
    width: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 1rem;
  }
`
