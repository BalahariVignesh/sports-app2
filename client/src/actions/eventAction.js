import {GET_EVENTS, DELETE_EVENT, ADD_EVENT, EVENTS_LOADING} from './types';
import axios from 'axios';

export const getEvents = () => dispatch => {
    dispatch(setEventsLoading());
    axios
        .get('/api/events/all')
        .then(res=>
            dispatch({
                type:GET_EVENTS,
                payload:res.data
            })
            )
};

export const addEvent = item => dispatch => {
    axios
        .post('/api/events',item)
        .then(res =>
            dispatch({
                type: ADD_EVENT,
                payload: res.data
            }))

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