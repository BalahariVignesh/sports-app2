import {GET_EVENTS, DELETE_EVENT} from './types';

export const getEvents = () =>{
    return{
        type: GET_EVENTS
        
    };
};

export const deleteEvent = id =>{
    return {
        type:DELETE_EVENT,
        payload: id
    }
}