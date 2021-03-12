import { createStore, combineReducers } from "redux";

function searchTermReducer(state: string[] = [], action: { type: string; payload: string }) {
  switch (action.type) {
    case "ADD_SEARCH_TERM":
      return [...state, action.payload];
    default:
      return state;
  }
}

const rootReducer = combineReducers({ searchTermReducer });

export const store = createStore(rootReducer);
