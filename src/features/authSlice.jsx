import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    username: null,
    token: null,
    Company: null,
    roles: [],
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      const { user, username, accessToken, Company, role } = action.payload;
      console.log(username);
      state.user = user;
      state.username = 'hola';
      state.token = accessToken;
      state.Company = Company;
      state.roles = role;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;
