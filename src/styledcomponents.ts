import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

export const StyledContainer = styled.div`
  text-align: start;
`
export const StyledH1 = styled.h1`
  color: #b83f45;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
  top: -140px;
  width: 100%;
`;

export const StyledInput = styled.input.attrs({ type: 'text' })`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  font-family: inherit;
  font-size: 24px;
  font-weight: inherit;
  line-height: 1.4em;
  margin: 0;
  padding: 6px;
  position: relative;
  border : none;
  width : 100%;
  outline : none;
`

export const StyledSection = styled.section`
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2), 0 25px 50px 0 rgba(0,0,0,.1);
  position: relative;
`;

export const StyledTodo = styled.div`
  border-bottom: 1px solid #ededed;
  font-size: 24px;
  position: relative;
  display : flex;
  align-items : center;

  &:last-child {
    border-bottom: none;
  }

  input[type="checkbox"] {
    appearance: none;
    height: 35px;
    width : 35px;
    border: 2px solid #999;
    border-radius: 50%;
    margin-left: 10px;
    outline : none;
    &:checked {
      border-color: #4CAF50;      // Cor da borda quando marcado
      &::after {
        content: '✔'; // Sinal de confirmação (pode ser substituído por um ícone)
        color: #4CAF50;  // Cor do sinal de confirmação
        font-size: 26px; // Tamanho do sinal de confirmação
        display: block;
        text-align: center;
      }
    }
  }

  label {
    padding: 15px 15px 15px 30px;
  }

  li {
    width : 100%;
    display : flex;
    align-items : center;
  }

  svg {
    margin-left: auto;
    margin-right: 20px;
    color: black; // Cor padrão
    transition: color 0.3s; // Adiciona uma transição suave para a mudança de cor
  }
`

export { FontAwesomeIcon, faChevronDown, faTimes };