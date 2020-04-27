const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGameEvent(data){
    let errors = {};

    data.event_name = !isEmpty(data.event_name) ? data.event_name: '';
    data.sport_type = !isEmpty(data.sport_type) ? data.sport_type: '';
    data.players_required = !isEmpty(data.players_required) ? data.players_required: '';
    
    if(Validator.isEmpty(data.event_name)){
        errors.event_name = 'Name of event is required';
    }
    
    if(Validator.isEmpty(data.sport_type)){
        errors.sport_type = 'Type of sport field is required';
    }
    
    if(!Validator.isNumeric(data.players_required)){
        errors.players_required = 'Must be a number';
    }
    
    if(Validator.isEmpty(data.players_required)){
        errors.players_required = 'Number of player field is required';
    }
    
    if(!isEmpty(data.imageURL)){
        if(!Validator.isURL(data.imageURL)){
            errors.imageURL = 'Not a valid URL';
        }
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};