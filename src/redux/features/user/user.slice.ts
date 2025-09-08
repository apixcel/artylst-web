import { IUser } from "@/interface/user.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: Partial<IUser> | null;
  isLoading: boolean;
  token: string | null;
};
const initialState: TAuthState = {
  user: null,
  isLoading: true,
  token: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<IUser> | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isLoading = false;
      state.token = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action?.payload || false;
    },

    updateUser(state, action: PayloadAction<Partial<IUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },

    setState(_state, action: PayloadAction<TAuthState>) {
      return action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setState, updateUser, setToken } =
  userSlice.actions;
export default userSlice.reducer;
