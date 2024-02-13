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
export const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: -50px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0,0,0,.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0,0,0,.2);
  content: "";
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  p {
    font-size : 20px
    color: #111;
    font: 14px Helvetica Neue,Helvetica,Arial,sans-serif;
    font-weight: 300;
    line-height: 1.4em;
    padding-left: 10px;
  }

  button {
    font: 14px Helvetica Neue,Helvetica,Arial,sans-serif;
    border: 1px solid transparent;
    border-radius: 3px;
    margin: 3px;
    padding: 3px 7px;
    background-color: transparent;
    cursor : pointer;
    &:hover {
      border-color: #db7676;
    }
  }

  span {
    font: 14px Helvetica Neue,Helvetica,Arial,sans-serif;
    cursor : pointer;
    padding-right: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`

export { FontAwesomeIcon, faChevronDown, faTimes };