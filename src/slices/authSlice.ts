import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import type { AuthState } from "../interface/auth.interface";

const initialState: AuthState = {
  token: Cookies.get("hAS-aTH"),
  role: Cookies.get("as-mhusqi"),
  guid: Cookies.get("glbl-unq-hr"),
  profile: null,
  permissions: [],
};

type LoginPayload = Pick<AuthState, "token" | "role" | "guid">;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.guid = action.payload.guid;
    },

    logout: (state) => {
      state.token = undefined;
      state.profile = undefined;
      state.role = undefined;
      Cookies.remove("hAS-aTH");
      Cookies.remove("as-mhusqi");
      Cookies.remove("glbl-unq-hr");
    },
    setProfile: (state, action: PayloadAction<Record<string, any> | null>) => {
      state.profile = action.payload;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
  blacklist: ["isErr", "dataErr", "isTimeout"],
};

const persistedAuthReducer = persistReducer(persistConfig, auth.reducer);

export const { login, logout, setProfile } = auth.actions;
export default persistedAuthReducer;
