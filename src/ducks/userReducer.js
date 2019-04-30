import axios from "axios";

let initialState = {
  first_name: "",
  last_name: "",
  username: "",
  bio: "",
  image: "",
  location: ""
};

//Action Types
export const REQ_USER_DATA = "REQ_USER_DATA";

//Action Creators
export const reqUserData = () => {
  return {
    type: REQ_USER_DATA,
    payload: axios
      .get("/auth/user-data")
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => console.log(err))
  };
};

//Reducer Function
export function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${REQ_USER_DATA}_FULFILLED`:
      const { first_name, last_name, username, bio, image, location } = payload;
      return { first_name, last_name, username, bio, image, location };
    default:
      return state;
  }
}
