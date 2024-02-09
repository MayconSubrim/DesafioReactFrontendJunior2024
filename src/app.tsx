import React, { useState, useEffect } from "react";
import { obterTodos } from "./service/todoservice";
import { Dados } from "./model/model";
import styled from 'styled-components';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const StyledContainer = styled.div`
  text-align: start;
`
const StyledH1 = styled.h1`
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

const StyledInput = styled.input.attrs({ type: 'text' })`
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

const StyledSection = styled.section`
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2), 0 25px 50px 0 rgba(0,0,0,.1);
  position: relative;
`;

const StyledTodo = styled.div`
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
`



export default function App() {
  const [dados, setDados] = useState<Dados[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    const dadosLocaisString = localStorage.getItem('todos');
    const dadosLocais = dadosLocaisString ? JSON.parse(dadosLocaisString) : [];
    if (dadosLocais.length > 0) {
      setDados(dadosLocais);
      setCarregando(false);
    } else {
      obterTodos()
        .then((dadosDaApi) => {
          setDados(dadosDaApi);
          setCarregando(false);
        })
        .catch((erro) => {
          console.error('Erro ao carregar dados iniciais:', erro);
          setCarregando(false);
        });
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && novaTarefa.trim() !== '') {
      const novaTarefaObj: Dados = { id: (dados.length + 1).toString(), title: novaTarefa, isDone: false };
      const novosDados = [...dados, novaTarefaObj];
  
      // Atualiza o localStorage
      localStorage.setItem('todos', JSON.stringify(novosDados));
  
      // Atualiza o estado
      setDados(novosDados);
      setNovaTarefa('');
    }
  };

  return (
    <StyledContainer>
      <StyledH1>Todos</StyledH1>
      <StyledSection>
      <div className="warp-newtodo">
        <FontAwesomeIcon style={{ fontSize: '24px', width: '60px' }} icon={faChevronDown} />
        <StyledInput
        placeholder="What needs to be done?"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        onKeyDown={handleKeyDown}
        ></StyledInput>
      </div>
      
      {carregando && <p>Carregando...</p>}

      {!carregando && (
        <ul style={{listStyle: "none", padding : "0"}}>
          {dados.map((item) => (
            <StyledTodo>
              <li key={item.id}><input type="checkbox" /><label>{item.title}</label></li>
            </StyledTodo>
          ))}
        </ul>
      )}
      </StyledSection>
    </StyledContainer>
  );
}