import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }

    :focus{
        outline: none;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-700']};
    }

    body{
        padding: 0 1rem;
    }

    body, input, button, textarea{
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        -webkit-font-smoothing: antialiased;
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme.white};
    }

    @media (max-width: 420px) {
        html{
            font-size: 87.5%;
        }
  }
    @media (max-width: 360px) {
        html{
            font-size: 75%;
        }
  }
`
