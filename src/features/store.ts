import { configureStore } from '@reduxjs/toolkit';
import groupsSlice from './groups/groupsSlice';

export const store = configureStore({
  reducer: {
    groups: groupsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
