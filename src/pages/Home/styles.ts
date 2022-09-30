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
  }
`
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
`

const BaseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-600']};
  font-weight: bold;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const TimeAmoutInput = styled(BaseInput)`
  width: 4.5rem;
`

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
