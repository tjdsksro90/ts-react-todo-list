import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial 타입정의
declare type stateType = {
  todos: Todo[];
  loading: boolean;
  error: string | null | undefined;
};

const initialState: stateType = {
  todos: [],
  loading: false,
  error: null,
};

export const getTodos = createAsyncThunk(`getTodos`, async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:4000/todos");
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addTodo = createAsyncThunk(
  `addTodo`,
  async (payload: Todo, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:4000/todos`, payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  `deleteTodo`,
  async (payload: number, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:4000/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  `toggleTodo`,
  async (payload: number, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:4000/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [...state.todos, action.payload];
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((item) => item.id !== action.payload);
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map((item) => {
          if (item.id === action.payload) {
            return { ...item, isDone: !item.isDone };
          } else {
            return item;
          }
        });
      });
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
