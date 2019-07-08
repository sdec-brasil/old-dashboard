import { combineReducers } from 'redux';

const initialState = {};

const defaultState = (state = initialState, action) => {
  switch (action.type) {
    case 'algo': {
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

const rootReducer = combineReducers({
  defaultState,
});

export default rootReducer;
