import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL, FILTER_CLOSE } from '../../utils/constants';
import { GetGroupsResponse, GroupRedux } from '../../types/types';

export const getGroups = createAsyncThunk('groups/getGroups', async () => {
  try {
    const res = await fetch(`${BASE_URL}groups.json`);
    const jsonData: GetGroupsResponse = await res.json();

    if (jsonData.result === 0) throw new Error('bad response');
    if (jsonData.data === undefined) throw new Error('bad data');

    return jsonData.data;
  } catch (err) {
    console.log(err);
  }
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState: <GroupRedux>{
    list: [],
    filtered: [],
  },
  reducers: {
    filteredList: (state, { payload }) => {
      if (payload.close != FILTER_CLOSE.ANY) {
        state.filtered = state.list?.filter(
          (item) => item.closed.toString() === payload.close
        );
      } else {
        state.filtered = state.list;
      }
      if (payload.avatar != 'any') {
        state.filtered = state.filtered?.filter(
          (item) => item.avatar_color === payload.avatar
        );
      }
      if (payload.friends != 'any') {
        state.filtered = state.filtered?.filter((item) => {
          return !!item.friends === !!payload.friends;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { filteredList } = groupsSlice.actions;

export default groupsSlice.reducer;
