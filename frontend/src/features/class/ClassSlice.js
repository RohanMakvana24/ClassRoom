import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

// ~~ Create Class AsyncThunk ~~
export const createNewClass = createAsyncThunk(
  "create/class",
  async (classData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/create-class`,
        classData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~ Delete Class AsyncThunk ~ //
export const deleteClass = createAsyncThunk(
  "delete/class",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/class/delete-class/${classId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Get Single Class AsyncThunk ~~ //
export const getSingleClassThunk = createAsyncThunk(
  "getSingleClass/class",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/class/get-single-class/${classId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Update Class AsyncThunk ~~ //

export const updateClassThunk = createAsyncThunk(
  "update/class",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/update-class`,
        values
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// ~~ getClass Code AsyncThunk ~~ //
export const getClassCode = createAsyncThunk(
  "class/getClassCode",
  async (classID, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/get-class-code`,
        {
          params: {
            classID: classID,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// ~~ 🤖 Class Slice ~~
var classSlice = createSlice({
  name: "class",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Note : Create Class Rudecers //
    builder.addCase(createNewClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewClass.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewClass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ~~~~~~~~~~~~ 👀 ~~~~~~~~~~~~ //

    // Note : Delete Class Rudecers ~
    builder.addCase(deleteClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteClass.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteClass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ~~~~~~~~~~~~ 👀 ~~~~~~~~~~~~ //

    // NOTE : Get Single Class Rudecers  //
    builder.addCase(getSingleClassThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleClassThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getSingleClassThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // NOTE : Delete Class Rudecers Section End //

    // ~~ Update Class Reduces ~~ //
    builder.addCase(updateClassThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateClassThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateClassThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ~~ Get Class Code Reduces ~~ //
    builder.addCase(getClassCode.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getClassCode.fulfilled, (state) => {
      state.pending = false;
    });
    builder.addCase(getClassCode.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload;
    });
  },
});

export default classSlice = classSlice.reducer;
