import uuid from 'react-uuid';
import {GET_EVENTS, DELETE_EVENT, ADD_EVENT, EVENTS_LOADING} from '../actions/types';
const initialState = {
    items: [
        
        {   id: uuid(), 
            event_name:'TT',
            sport_type:'Table Tennis',
            players_required: 3,
            venue:'SRH',
            additional_info:'Blah blah blah',
            imageURL:'tada',
            start:'start'
        
        }
     

    ],
    loading: false
}

export default function(state= initialState, action){
    switch(action.type){
        case GET_EVENTS:
            return{
                ...state
            };
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