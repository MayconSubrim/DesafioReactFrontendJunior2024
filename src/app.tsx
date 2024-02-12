import React, { useState, useEffect } from "react";
import { obterTodos } from "./service/todoservice";
import { Dados } from "./model/model";
import styled from 'styled-components';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes  } from '@fortawesome/free-solid-svg-icons';


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



export default function App() {
  const [dados, setDados] = useState<Dados[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mouseSobreId, setMouseSobreId] = useState(null);
  const [editingTask, setEditingTask] = useState({ id: null, newTitle: '' });
  const [isEditing, setIsEditing] = useState(false);

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

  const removerItem = (id: string) => {
    const novaLista = dados.filter((item) => item.id !== id);
    localStorage.setItem('todos', JSON.stringify(novaLista));
    setDados(novaLista);
  };

  const handleMouseEnter = (id : any) => {
    setMouseSobreId(id);
  };

  const handleMouseLeave = () => {
    setMouseSobreId(null);
  };

  const handleToggleDone = (id: string) => {
    const updatedTarefas = dados.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, isDone: !tarefa.isDone } : tarefa
    );
    localStorage.setItem('todos', JSON.stringify(updatedTarefas));
    setDados(updatedTarefas);
  };

  const handleMouseDoubleClick = (id : any) => {
    setEditingTask({ id, newTitle: dados.find((item) => item.id === id)?.title || '' });
    setIsEditing(true);
  };
  

  const handleEditInputChange = (event: { target: { value: any; }; }) => {
    setEditingTask({ ...editingTask, newTitle: event.target.value });
  };

  const handleEditBlur = () => {
    if (editingTask.id && editingTask.newTitle) {
      const updatedTarefas = dados.map((tarefa) =>
        tarefa.id === editingTask.id ? { ...tarefa, title: editingTask.newTitle } : tarefa
      );
  
      localStorage.setItem('todos', JSON.stringify(updatedTarefas));
      setDados(updatedTarefas);
      setEditingTask({ id: null, newTitle: '' });
      setIsEditing(false);
    } else {
      // Se id ou newTitle estiverem ausentes, sair do modo de edição sem salvar
      setIsEditing(false);
    }
  };


  const handleEditKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleEditBlur();
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
        <ul style={{listStyle: "none", padding : "0"}} onBlur={handleEditBlur}>
          {dados.map((item) => (
            <StyledTodo key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                <li key={item.id}>
                {isEditing && editingTask.id === item.id ? (
                <input
                type="text"
                value={editingTask.newTitle}
                onChange={handleEditInputChange}
                onBlur={handleEditBlur}
                onKeyPress={handleEditKeyPress}
                style={{width : '100%', height : '58px', outline: 'none', border : '2px solid red', fontSize : '24px', paddingLeft : '30px'  }}
                />
                ) : (
                <>
                <input type="checkbox" checked={item.isDone} onChange={() => handleToggleDone(item.id)} />
                <label onDoubleClick={() => handleMouseDoubleClick(item.id)}>{item.title}</label>
                { mouseSobreId === item.id && (
                <FontAwesomeIcon icon={faTimes} 
                onClick={() => removerItem(item.id)} 
                style={{ marginLeft: 'auto', 
                marginRight: "10px", 
                cursor: 'pointer', 
                color: mouseSobreId === item.id ? 'red' : 'black',
                transition: 'color 5s', 
                }}/>)}</>)}</li>
            </StyledTodo>
          ))}
        </ul>
      )}
      </StyledSection>
    </StyledContainer>
  );
}
