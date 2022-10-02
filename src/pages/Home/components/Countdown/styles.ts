import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  display: flex;
  gap: 1rem;

  span {
    padding: 2rem 1rem;
    border-radius: 8px;
    background-color: ${(props) => props.theme['gray-700']};
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
`
