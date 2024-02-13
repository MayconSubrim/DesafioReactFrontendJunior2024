import React, { useState, useEffect } from "react";
import { obterTodos } from "./service/todoservice";
import { Dados } from "./model/model";
import {
  StyledContainer,
  StyledH1,
  StyledInput,
  StyledSection,
  FontAwesomeIcon,
  faChevronDown,
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
      )}
      </StyledSection>
    </StyledContainer>
  );
}
