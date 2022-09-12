import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToHash, isInHash } from "../../auxiliaries/hash";
import cleaner from "./cleaner";

const initialState = {
  entry: {},
  status: "idle", // Idle | pending | fulfilled | rejected
};

export const searchEntry = createAsyncThunk(
  "entry/searchEntry",
  async (word, { rejectWithValue }) => {
    // prettier-ignore
    const headers = new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache; no-store",
      "Accept-Ranges": "bytes",
    });
    const request = new Request(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      {
        method: "GET",
        headers,
      }
    );
    /**
     * all 404 statuses we write to hash table
     * for preventing ineffective fetches
     */
    try {
      const response = await fetch(request);
      if (+response.status === 404)
        throw new Error(`No exact match found for "${word}"`, {
          cause: response.status,
        });
      if (!response.ok) throw new Error(`Check your internet connection`);
      let [json] = await response.json();

      /**
       * I convert all audio resources to Blob
       * to prevent Error net::ERR_CACHE_OPERATION_NOT_SUPPORTED:
       */

      let audioBlob = [];
      for (let audio of json.phonetics) {
        if (!audio.audio.length || audio?.audio === undefined) continue;
        await fetch(audio.audio)
          .then((response) => response.blob())
          .then((blob) => {
            audioBlob = [
              ...audioBlob,
              {
                text:
                  !audio.text || audio?.text === undefined
                    ? cleaner(json.phonetics)
                    : audio.text,
                audio: URL.createObjectURL(blob),
              },
            ];
          });
      }
      // prettier-ignore
      return Object.assign({}, { ...json }, {"phonetics": audioBlob});
    } catch (err) {
      return rejectWithValue({
        noMatchedWord: word,
        errorMessage: err.message,
        cause: err.cause,
      });
    }
  }
);

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    setEntry: (state, action) => {
      state.entry = action.payload;
    },
  },
  extraReducers: {
    [searchEntry.pending]: (state) => {
      state.status = "pending";
    },
    [searchEntry.fulfilled]: (state, action) => {
      if (!isInHash(action.payload.word)) addToHash(action.payload);
      state.entry = action.payload;
      state.status = "fulfilled";
    },
    [searchEntry.rejected]: (state, action) => {
      if (action.payload.cause && +action.payload.cause === 404) {
        if (!isInHash(action.payload.noMatchedWord)) addToHash(action.payload);
      }
      state.entry = action.payload;
      state.status = "rejected";
    },
  },
});

export const { setEntry } = entrySlice.actions;
export const selectEntry = (state) => state.entry.entry;
export const selectStatus = (state) => state.entry.status;
export default entrySlice.reducer;
