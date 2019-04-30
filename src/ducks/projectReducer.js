import axios from "axios";

let initialState = {
  projects: []
};

//Action Types
export const GET_PROJECTS = "GET_PROJECTS";

//Action Creators
export const reqProjects = () => {
  return {
    type: GET_PROJECTS,
    payload: axios
      .get("/api/project")
      .then(res => res.data)
      .catch(err => console.log(err))
  };
};

//Reducer Function
export function projectReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${GET_PROJECTS}_FULFILLED`:
      return { projects: payload };
    default:
      return state;
  }
}
