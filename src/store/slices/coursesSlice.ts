import type { Course, CoursesState } from "../../types/coursesTypes.ts";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { API_URL } from "../../constants/api.ts";

const initialState: CoursesState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "videos/fetchCourses",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }
    const data = await response.json();
    return data as Course[];
  },
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        },
      )
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default coursesSlice.reducer;
