import uuid from 'react-uuid';
import {GET_EVENTS} from '../actions/types';
const initialState = {
    items: [
        {id: uuid(), 
            event_name:'TT',
            sport_type:'Table Tennis',
            players_required: 3,
            venue:'SRH',
            additional_info:'Blah blah blah',
            imageURL:'tada',
            start:'start'
        
        },
        {   id: uuid(), 
            event_name:'TT',
            sport_type:'Table Tennis',
            players_required: 3,
            venue:'SRH',
            additional_info:'Blah blah blah',
            imageURL:'tada',
            start:'start'
        
        },
        {   id: uuid(), 
            event_name:'TT',
            sport_type:'Table Tennis',
            players_required: 3,
            venue:'SRH',
            additional_info:'Blah blah blah',
            imageURL:'tada',
            start:'start'
        
        },
        {   id: uuid(), 
            event_name:'TT',
            sport_type:'Table Tennis',
            players_required: 3,
            venue:'SRH',
            additional_info:'Blah blah blah',
            imageURL:'tada',
            start:'start'
        
        }
     

    ]
}

export default function(state= initialState, action){
    switch(action.type){
        case GET_EVENTS:
            return{
                ...state
            };
        default:
            return state;
    }
}