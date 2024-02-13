import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { obterTodos } from "./service/todoservice";
import { Dados } from "./model/model";
import {
  StyledContainer,
  StyledH1,
  StyledInput,
  StyledSection,
  FontAwesomeIcon,
  faChevronDown,
  StyledFooter,
} from "./styledcomponents";
import TodoItem from "./components/todoItem";
import './style.css';



export default function App() {
  const [dados, setDados] = useState<Dados[]>([]);
  const [carregando, setCarregando] = useState(true); 
  const [novaTarefa, setNovaTarefa] = useState(''); 
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<{ id: string | null; newTitle: string }>({ id: null, newTitle: '' });
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
      const novaTarefaObj: Dados = { id: (Math.random().toString(36).substring(2)).toString(), title: novaTarefa, isDone: false };
      const novosDados = [...dados, novaTarefaObj];
      localStorage.setItem('todos', JSON.stringify(novosDados));
      setDados(novosDados);
      setNovaTarefa('');
    }
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
      setIsEditing(false);
    }
  };
  const handleEditKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleEditBlur();
    }
  };

  const countIsDone = dados.filter(item => !item.isDone).length;

  const ClearAll = () => {
    setDados([])
    localStorage.removeItem('todos');
  }

  const ClearCompleted = () => {
    const completedData = dados.filter(item => !item.isDone);
    setDados(completedData);
    localStorage.setItem('todos', JSON.stringify(completedData));
  }

  return (
    <Router>
    <StyledContainer>
      <StyledH1>Todos</StyledH1>
      <StyledSection>
      <div className="warp-newtodo">
        <FontAwesomeIcon style={{ fontSize: '24px', width: '60px' }} icon={faChevronDown} onClick={ClearAll}/>
        <StyledInput
        placeholder="What needs to be done?"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        onKeyDown={handleKeyDown}
        ></StyledInput>
      </div>
      
      {carregando && <p>Carregando...</p>}

      {!carregando && (
        
          <Routes>
          <Route
            path=""
            element={
            <ul style={{listStyle: "none", padding : "0"}} onBlur={handleEditBlur}>
              {dados.map((item) => (
                    <TodoItem
                    key={item.id}
                    item={item}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editingTask={editingTask}
                    handleEditBlur={handleEditBlur}
                    handleEditKeyPress={handleEditKeyPress}
                    setEditingTask={setEditingTask}
                    dados={dados}
                    setDados={setDados}
                    />
            ))}
          </ul>
            }
          />
          <Route path="/completed" element={
            <ul style={{ listStyle: "none", padding: "0" }} onBlur={handleEditBlur}>
            {dados.map((item) => {
              if (item.isDone) {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editingTask={editingTask}
                    handleEditBlur={handleEditBlur}
                    handleEditKeyPress={handleEditKeyPress}
                    setEditingTask={setEditingTask}
                    dados={dados}
                    setDados={setDados}
                  />
                );
              }
              return null;
            })}
          </ul>
          }/>
          <Route path="/todone" element={
            <ul style={{ listStyle: "none", padding: "0" }} onBlur={handleEditBlur}>
            {dados.map((item) => {
              if (!item.isDone) {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editingTask={editingTask}
                    handleEditBlur={handleEditBlur}
                    handleEditKeyPress={handleEditKeyPress}
                    setEditingTask={setEditingTask}
                    dados={dados}
                    setDados={setDados}
                  />
                );
              }
              return null;
            })}
          </ul>
          }/>
          </Routes>
      )}
       <StyledFooter>
          <p>{countIsDone} items left!</p>
          <div>
            <Link to={"/"}><button>All</button></Link>
            <Link to={"/todone"}><button>Active</button></Link>
            <Link to={"/completed"}><button>Completed</button></Link>
          </div>
          <span onClick={ClearCompleted}>Clear completed</span>
      </StyledFooter>
      </StyledSection>
    </StyledContainer>
    </Router>
  );
}
