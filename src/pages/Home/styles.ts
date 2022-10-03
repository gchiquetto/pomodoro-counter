import styled from 'styled-components'

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.75rem;
    max-width: 100%;
  }
`

const BaseButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-100']};
`

export const StartCountdownButton = styled(BaseButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`
export const StopCountdownButton = styled(BaseButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`
