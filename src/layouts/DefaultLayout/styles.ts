import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme['gray-800']};
  max-width: 74rem;
  margin: 5rem auto;
  height: calc(100vh - 10rem);
  border-radius: 8px;
  padding: 2.5rem;
`
