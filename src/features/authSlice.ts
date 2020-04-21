import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    email: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    token: null,
    email: null,
    isLoggedIn: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{email: string, token: string}>) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logout: () => {
            return initialState;
        }
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
