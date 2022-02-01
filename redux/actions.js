import * as types from "./actionType";
import axios from "axios";
const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});
const userDeleted = (id) => ({
  type: types.DELETE_USERS,
  payload: id,
});

const userAdded=(userdata)=>({
  
  type: types.ADD_USERS,
  payload: userdata

})
const userView=(id)=>({
  type: types.VIEW_USERS,
  payload:id
  

})
export const loadUsers = () => {
  console.log(process.env);
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((resp) => {
        console.log("getapi", resp);
        dispatch(getUsers(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
export const deleteUsers = (_id) => {
  console.log(_id);
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${_id}`)
      .then((resp) => {
        console.log("deletapi", resp);
        dispatch(userDeleted(_id));
      })
      .catch((error) => console.log(error));
  };
};
export const addUsers = (user) => {
  
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`,user)
      .then((resp) => {
        console.log("post data", resp);
        dispatch(userAdded(user));
       
      })
      .catch((error) => console.log(error));
  };
};
export const viewUsers = (_id) => {
  
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${_id}`)
      
      .then((resp) => {
        console.log("viewapi", resp.data);
        dispatch(userView(resp.data));
       
      })
      .catch((error) => console.log(error));
  };
};