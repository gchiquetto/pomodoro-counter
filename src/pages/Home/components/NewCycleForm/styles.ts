import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};

  & .task-container {
    flex: 1;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 420px) {
    font-size: 1rem;
  }
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
