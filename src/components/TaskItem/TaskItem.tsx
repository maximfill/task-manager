// src/components/TaskItem/TaskItem.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { toggleCompleteTask, setEditingTask, openModal } from '../../services/todos/todosSlice';
import { deleteTask } from '../../services/todos/todosActions';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  taskId: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskId }) => {
  const task = useSelector((state: RootState) =>
    state.todos.tasks.find((task) => task.id === taskId)
  );
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleDelete = () => {
    if (token) {
      dispatch(deleteTask(taskId, token));
    }
  };

  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.dueDate}>Due: {task.dueDate}</p>
      <div className={styles.actions}>
        <button
          onClick={() => dispatch(toggleCompleteTask(task.id))}
          className={styles.completeButton}
        >
          {task.completed ? 'Undo Complete' : 'Complete'}
        </button>
        <button
          onClick={() => {
            dispatch(setEditingTask(task.id));
            dispatch(openModal());
          }}
          className={styles.editButton}
        >
          Edit
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;