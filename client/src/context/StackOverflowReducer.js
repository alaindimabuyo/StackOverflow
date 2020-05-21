import {
    SET_LOADING,
    GET_QUESTIONS,
    FETCH_DATA
  } from "./types"


  export default (state, action) => {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false
            };
        case FETCH_DATA:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return false;
    }
  }