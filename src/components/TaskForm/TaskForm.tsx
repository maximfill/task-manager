import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { addTask, updateTask } from '../../services/todos/todosActions';
import { isBefore, parseISO, format } from 'date-fns';
import {
  setTitle,
  setDescription,
  setDueDate,
  clearForm,
  closeModal,
} from '../../services/todos/todosSlice';
import styles from './TaskForm.module.css';

const TaskForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useSelector((state: RootState) => state.todos.title);
  const description = useSelector((state: RootState) => state.todos.description);
  const dueDate = useSelector((state: RootState) => state.todos.dueDate);
  const editingTaskId = useSelector((state: RootState) => state.todos.editingTaskId);
  const tasks = useSelector((state: RootState) => state.todos.tasks);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (editingTaskId !== null) {
      const taskToEdit = tasks.find(task => task.id === editingTaskId);
      if (taskToEdit) {
        dispatch(setTitle(taskToEdit.title));
        dispatch(setDescription(taskToEdit.description));
        const formattedDueDate = format(new Date(taskToEdit.dueDate), 'yyyy-MM-dd');
        dispatch(setDueDate(formattedDueDate));
      }
    }
  }, [editingTaskId, tasks, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const selectedDate = parseISO(dueDate);

    if (isBefore(selectedDate, today)) {
      alert("Please select a current or future date.");
      return;
    }

    const newTask = {
      title,
      description,
      isCompleted: false,
      dueDate,
    };

    if (token) {
      if (editingTaskId !== null) {
        dispatch(updateTask(newTask, token, editingTaskId));
      } else {
        dispatch(addTask(newTask, token));
      }
      dispatch(clearForm());
      dispatch(closeModal());
    }
  };

  const handleCancel = () => {
    dispatch(clearForm());
    dispatch(closeModal());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        className={styles.input}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
        className={styles.textarea}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => dispatch(setDueDate(e.target.value))}
        className={styles.input}
        required
      />
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          {editingTaskId !== null ? 'Edit Task' : 'Save Task'}
        </button>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;