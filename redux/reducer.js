import * as types from "./actionType";
const initialState = {
  users: [],
  user: {},
  loading: false,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.DELETE_USERS:
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case types.ADD_USERS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
      };
    case types.VIEW_USERS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducers;
