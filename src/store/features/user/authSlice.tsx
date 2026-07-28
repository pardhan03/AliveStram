import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    isAnonymous: boolean;
}

interface AuthState {
    profile: UserProfile | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    profile: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveProfile: (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.isAuthenticated = true;
        },

        resetProfile: (state) => {
            state.profile = null;
            state.isAuthenticated = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveProfile, resetProfile } = authSlice.actions;

export default authSlice.reducer;