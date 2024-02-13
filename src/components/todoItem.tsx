import React, { Dispatch, SetStateAction, useState } from 'react';
import { Dados } from '../model/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StyledTodo } from '../styledcomponents';

interface TodoItemProps {
  item: Dados;
  dados: Dados[];
  setDados: React.Dispatch<React.SetStateAction<Dados[]>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editingTask: { id: string | null; newTitle: string };
  handleEditBlur: () => void;
  handleEditKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setEditingTask: Dispatch<SetStateAction<{ id: null | string; newTitle: string }>>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  isEditing,
  setIsEditing,
  editingTask,
  handleEditBlur,
  handleEditKeyPress,
  setEditingTask,
  dados,
  setDados
}) => {

  const [mouseSobreId, setMouseSobreId] = useState(null);


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


  return (
    <StyledTodo key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
      <li key={item.id}>
        {isEditing && editingTask.id === item.id ? (
          <input
            type="text"
            value={editingTask.newTitle}
            onChange={handleEditInputChange}
            onBlur={handleEditBlur}
            onKeyPress={handleEditKeyPress}
            style={{ width: '100%', height: '58px', outline: 'none', border: '2px solid red', fontSize: '24px', paddingLeft: '30px' }}
          />
        ) : (
          <>
            <input type="checkbox" checked={item.isDone} onChange={() => handleToggleDone(item.id)} />
            <label onDoubleClick={() => handleMouseDoubleClick(item.id)}>{item.title}</label>
            {mouseSobreId === item.id && (
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => removerItem(item.id)}
                style={{
                  marginLeft: 'auto',
                  marginRight: '10px',
                  cursor: 'pointer',
                  color: mouseSobreId === item.id ? 'red' : 'black',
                  transition: 'color 5s',
                }}
              />
            )}
          </>
        )}
      </li>
    </StyledTodo>
  );
};

export default TodoItem;