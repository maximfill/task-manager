import React, { useEffect } from 'react';
import styles from './TaskList.module.css';
import { useSelector } from 'react-redux';
import { fetchTasks } from '../../services/todos/todosService';
import { RootState, useAppDispatch } from '../../services/store';
import TaskItem from '../TaskItem/TaskItem';

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.todos);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token));
    }
  }, [dispatch, token]);

  if (!token) return <p>Please login to see your tasks</p>;

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.taskList}>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) =>
          task && task.id ? (
            <TaskItem key={task.id} taskId={task.id} />
          ) : (
            <div key={Math.random()}>Invalid task data</div>
          )
        )
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;