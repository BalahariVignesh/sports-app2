
import {GET_EVENTS, DELETE_EVENT, ADD_EVENT, EVENTS_LOADING, GET_EVENT, JOIN_EVENT} from '../actions/types';
const initialState = {
    items: [],
    event:[],
    loading: false,
    user:localStorage.getItem('user')
}

export default function(state= initialState, action){
    switch(action.type){
        case GET_EVENTS:
            return{
                ...state,
                items: [...action.payload, ...state.items]
            };
        case JOIN_EVENT:
        case GET_EVENT:
            return{
                ...state,
                event: action.payload,
                items: [...state.items],
                
                
            }
        case DELETE_EVENT:
            return{
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case ADD_EVENT:
            return{
                ...state,
                items: [action.payload, ...state.items]
            };
        case EVENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}