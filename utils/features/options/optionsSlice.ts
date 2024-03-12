import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OptionsState {
  sound: boolean;
  language: string;
}

const initialState: OptionsState = {
  sound: true,
  language: 'fr',
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    toggleSound: state => {
      state.sound = !state.sound;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleSound, setLanguage } = optionsSlice.actions;

export default optionsSlice.reducer;