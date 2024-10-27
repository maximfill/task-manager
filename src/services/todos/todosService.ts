import { AppDispatch } from '../store';
import { fetchTasksStart, fetchTasksSuccess, fetchTasksFailure } from './todosSlice';


export const fetchTasks = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchTasksStart());
  try {
    const response = await fetch('http://api.calmplete.net/api/Todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch tasks');
    }

    const data = await response.json();
    dispatch(fetchTasksSuccess(data));

  } catch (error) {
    dispatch(fetchTasksFailure((error as Error).message || 'Failed to fetch tasks'));
  }
};


interface NewTask {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
}

export const addTaskToServer = async (task: NewTask, token: string): Promise<void> => {
  const response = await fetch('http://api.calmplete.net/api/Todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add task');
  }

  if (response.status === 204) {
    return;
  }
};


export const updateTaskOnServer = async (task: NewTask, token: string, taskId: number): Promise<void> => {
  const response = await fetch(`http://api.calmplete.net/api/Todos/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update task');
  }
};


export const deleteTaskFromServer = async (taskId: number, token: string): Promise<void> => {
  const response = await fetch(`http://api.calmplete.net/api/Todos/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete task');
  }
};
















