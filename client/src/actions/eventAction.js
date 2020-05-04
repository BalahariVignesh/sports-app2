import {GET_EVENTS, DELETE_EVENT, ADD_EVENT, EVENTS_LOADING, GET_EVENT, JOIN_EVENT} from './types';
import axios from 'axios';

import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getEvents = () => (dispatch,getState) => {
    dispatch(setEventsLoading());
   
    axios
        .get('/api/events',tokenConfig(getState))
        .then(res=>
            dispatch({
                type:GET_EVENTS,
                payload:res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
            );
};

export const getEvent = (id) => (dispatch,getState) => {
    dispatch(setEventsLoading());
 
    axios
        .get(`/api/events/${id}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_EVENT,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
            );
};

export const addEvent = item => (dispatch,getState) => {
    axios
        .post('/api/events',item,tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_EVENT,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
            );
};

export const joinEvent = event => (dispatch, getState) =>{
    console.log(event);
    axios

        .put(`/api/events/${event.id}/join`,event,tokenConfig(getState))
        .then(res=>
            dispatch({
                type: JOIN_EVENT,
                payload: res.data.event,
           
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
            );
};

export const deleteEvent = id =>{
    return {
        type:DELETE_EVENT,
        payload: id
    };

};



export const setEventsLoading = () =>
{
    return{
        type: EVENTS_LOADING
    };
};