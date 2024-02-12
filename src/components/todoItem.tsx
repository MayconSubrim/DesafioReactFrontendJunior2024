import React from 'react';
import { Dados } from '../model/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StyledTodo } from '../styledcomponents';

interface TodoItemProps {
  item: Dados;
  isEditing: boolean;
  editingTask: { id: string | null; newTitle: string };
  handleMouseEnter: (id: any) => void;
  handleMouseLeave: () => void;
  handleEditInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditBlur: () => void;
  handleEditKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleToggleDone: (id: string) => void;
  handleMouseDoubleClick: (id: any) => void;
  removerItem: (id: string) => void;
  mouseSobreId: any;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  isEditing,
  editingTask,
  handleMouseEnter,
  handleMouseLeave,
  handleEditInputChange,
  handleEditBlur,
  handleEditKeyPress,
  handleToggleDone,
  handleMouseDoubleClick,
  removerItem,
  mouseSobreId,
}) => {
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