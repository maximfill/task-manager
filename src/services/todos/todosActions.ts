import { AppDispatch } from '../store';
import { addTaskStart, addTaskFailure } from './todosSlice';
import { fetchTasks } from './todosService';
import { addTaskToServer, updateTaskOnServer, deleteTaskFromServer } from './todosService';

interface NewTask {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
}


export const addTask = (task: NewTask, token: string) => async (dispatch: AppDispatch) => {
  dispatch(addTaskStart());
  try {
    await addTaskToServer(task, token);
    dispatch(fetchTasks(token));

  } catch (error) {
    dispatch(addTaskFailure((error as Error).message || 'Failed to add task'));
  }
};


export const updateTask = (task: NewTask, token: string, taskId: number) => async (dispatch: AppDispatch) => {
  dispatch(addTaskStart());
  try {
    await updateTaskOnServer(task, token, taskId);
    dispatch(fetchTasks(token));

  } catch (error) {
    dispatch(addTaskFailure((error as Error).message || 'Failed to update task'));
  }
};


export const deleteTask = (taskId: number, token: string) => async (dispatch: AppDispatch) => {
  try {
    await deleteTaskFromServer(taskId, token);
    dispatch(fetchTasks(token));

  } catch (error) {
    console.error('Failed to delete task', error);
  }
};

