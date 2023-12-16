import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// initial 타입정의

const initialState: Todo[] = [
  {
    id: 1,
    title: "할일 타이틀 1",
    content: "할일 내용 1",
    isDone: false,
  },
  {
    id: 2,
    title: "할일 타이틀 2",
    content: "할일 내용 2",
    isDone: true,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      return [...state, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
