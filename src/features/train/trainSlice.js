import { createSlice } from "@reduxjs/toolkit";
import { subset, subtract } from "../../auxiliaries/sets";
import shuffle from "../../auxiliaries/shuffle";

const initialState = {
  status: "idle",
  savedWords: [],
  drillIndices: [],
  selectedWords: [],
  drillCompleteStatus: false,
  drilledWord: "",
  drillStep: 0,
  correctAnswerStep: 0,
  correctStatus: false,
  currentDuration: 5040,
  path: "M 50,50 L50,0 A50,50 1 0 1 50,0 Z",
};

const trainSlice = createSlice({
  name: "train",
  initialState,
  reducers: {
    saveWord: (state, action) => {
      if (subset(state.savedWords, action.payload).length) {
        state.savedWords = subtract(state.savedWords, action.payload);
        return;
      }
      state.savedWords = [...state.savedWords, action.payload];
    },
    selectWord: (state, action) => {
      if (subset(state.selectedWords, action.payload).length) {
        state.selectedWords = subtract(state.selectedWords, action.payload);
        return;
      }
      state.selectedWords = [...state.selectedWords, action.payload];
    },
    deleteSelectedWords: (state) => {
      let tempArray = state.savedWords;
      state.selectedWords.map((selection) => {
        tempArray = subtract(tempArray, selection);
      });
      (state.savedWords = tempArray) && (state.selectedWords = []);
    },
    setDuration: (state, action) => {
      state.currentDuration = action.payload;
    },
    initDrilledList: (state) => {
      state.drillIndices = shuffle(
        [...Array(state.savedWords.length)].map((item, i) => (item = i))
      );
    },
    successStep: (state) => {
      if (state.drillStep !== state.savedWords.length) {
        state.drillStep = state.drillStep + 1;
        state.drilledWord =
          state.savedWords[state.drillIndices[state.drillStep]];
      }
    },
    successCorrectAnswerStep: (state) => {
      state.correctAnswerStep = state.correctAnswerStep + 1;
    },
    resetDrillStep: (state) => {
      state.drillStep = 0;
    },
    resetAnswersStep: (state) => {
      state.correctAnswerStep = 0;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCorrectStatus: (state, action) => {
      state.correctStatus = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    resetPath: (state) => {
      state.path = "M 50,50 L50,0 A50,50 1 0 1 50,0 Z";
    },
    setDrillCompleteStatus: (state, action) => {
      state.drillCompleteStatus = action.payload;
    },
  },
});

export const {
  saveWord,
  selectWord,
  deleteSelectedWords,
  setDuration,
  successStep,
  setStatus,
  setCorrectStatus,
  setPath,
  resetPath,
  resetDrillStep,
  successCorrectAnswerStep,
  initDrilledList,
  setDrillCompleteStatus,
  resetAnswersStep,
} = trainSlice.actions;
export const selectSelectedWords = (state) => state.train.selectedWords;
export const selectSavedWords = (state) => state.train.savedWords;
export const selectDrilledWord = (state) =>
  state.train.savedWords[state.train.drillIndices[state.train.drillStep]];
export const selectDrillStep = (state) => state.train.drillStep;
export const selectCorrectAnswerStep = (state) => state.train.correctAnswerStep;
export const selectDrillCompleteStatus = (state) =>
  state.train.drillCompleteStatus;
export const selectSavedWordsCount = (state) => state.train.savedWords.length;
export const selectCurrentDuration = (state) => state.train.currentDuration;
export const selectStatus = (state) => state.train.status;
export const selectCorrectStatus = (state) => state.train.correctStatus;
export const selectPath = (state) => state.train.path;
export default trainSlice.reducer;
