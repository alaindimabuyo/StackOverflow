import React, { useReducer, useState, useRef, useCallback  } from "react";
import StackOverflowContext from "./StackOverflowContext";
import StackOverFlowReducer from "./StackOverflowReducer";
import axios from "axios";

import {
    SET_LOADING,
    GET_QUESTIONS,
    FETCH_DATA
  } from "./types"

const StackOverflowState = props => {
    const initialState = {
        questions: [],
        loading: false,
        items: []
        
    }

    const [pageNumber, setPageNumber] = useState(1)
   
    const [state, dispatch] = useReducer(StackOverFlowReducer, initialState);

    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    const getItems = async () => {
        setLoading();
        const res = await axios.get(`/api?page=${pageNumber}`);
       
        dispatch({ type: GET_QUESTIONS, payload: res.data.items });
    };
 
    
    const fetchData = async () => {
      setLoading()
      setPageNumber(prevPageNumber => prevPageNumber + 1)
      const res = await axios.get(`/api?page=${pageNumber}`);
      
      dispatch({type: FETCH_DATA, payload: res.data.items})

    }
    return (
        <StackOverflowContext.Provider
          value={{
            getItems,
            questions: state.questions,
            loading: state.loading,
            fetchData
          }}
        >
          {props.children}
        </StackOverflowContext.Provider>
    );
}   

export default StackOverflowState;

