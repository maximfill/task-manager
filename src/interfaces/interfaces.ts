export interface ITodosState {
  tasks: ITask[];
  title: string;
  description: string;
  dueDate: string;
  isModalOpen: boolean;
  editingTaskId: number | null;
  loading: boolean;
  error: string | null;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface IAuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  email: string | null;
  error: string | null;
  isLoading: boolean;
}

export interface INewTask {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
}
