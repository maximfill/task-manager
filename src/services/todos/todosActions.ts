import { AppDispatch } from '../store';
import { addTaskStart, addTaskFailure } from './todosSlice';
import { fetchTasks } from './todosService';
import { addTaskToServer, updateTaskOnServer, deleteTaskFromServer } from './todosService';
import { INewTask } from '../../interfaces/interfaces';


export const addTask = (task: INewTask, token: string) => async (dispatch: AppDispatch) => {
  dispatch(addTaskStart());
  try {
    await addTaskToServer(task, token);
    dispatch(fetchTasks(token));

  } catch (error) {
    dispatch(addTaskFailure((error as Error).message || 'Failed to add task'));
  }
};


export const updateTask = (task: INewTask, token: string, taskId: number) => async (dispatch: AppDispatch) => {
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