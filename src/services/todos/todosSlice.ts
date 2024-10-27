import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface TodosState {
  tasks: Task[];
  title: string;
  description: string;
  dueDate: string;
  isModalOpen: boolean;
  editingTaskId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  tasks: [],
  title: '',
  description: '',
  dueDate: '',
  isModalOpen: false,
  editingTaskId: null,
  loading: false,
  error: null,
};


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setDueDate(state, action: PayloadAction<string>) {
      state.dueDate = action.payload;
    },
    clearForm(state) {
      state.title = '';
      state.description = '';
      state.dueDate = '';
    },
    addTaskStart(state) {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess(state, action: PayloadAction<Task>) {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    addTaskFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTasksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    toggleCompleteTask(state, action: PayloadAction<number>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setEditingTask(state, action: PayloadAction<number | null>) {
      state.editingTaskId = action.payload;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.editingTaskId = null;
    },
    updateTask(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const {
  setTitle,
  setDescription,
  setDueDate,
  clearForm,
  addTaskStart,
  addTaskSuccess,
  addTaskFailure,
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  editTask,
  toggleCompleteTask,
  setEditingTask,
  openModal,
  closeModal,
  updateTask,
  deleteTask,
} = todosSlice.actions;

export default todosSlice.reducer;
