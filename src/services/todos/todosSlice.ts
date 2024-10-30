import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodosState, ITask } from '../../interfaces/interfaces';

const initialState: ITodosState = {
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
    addTaskSuccess(state, action: PayloadAction<ITask>) {
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
    fetchTasksSuccess(state, action: PayloadAction<ITask[]>) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editTask(state, action: PayloadAction<ITask>) {
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
} = todosSlice.actions;

export default todosSlice.reducer;
