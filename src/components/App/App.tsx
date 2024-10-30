import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import AuthForm from '../AuthForm/AuthForm';
import styles from './App.module.css';
import { openModal } from '../../services/todos/todosSlice';
import { initializeAuth } from '../../services/auth/authSlice';
import { useEffect } from 'react';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isModalOpen = useSelector((state: RootState) => state.todos.isModalOpen);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1>Task Manager</h1>
      </header>
      <main className={styles.main}>
        {!isAuthenticated ? (
          <AuthForm />
        ) : (
          <>
            <button className={styles.openModalButton}
            onClick={() => dispatch(openModal())} 
            >
              Add New Task
            </button>
            {isModalOpen && <TaskForm />}
            <TaskList />
          </>
        )}
      </main>
    </div>
  );
};

export default App;