const express = require('express');
const router = express.Router();
const passport = require('passport');


const validateGameEvent = require('../../validation/event');

const GameEvent = require('../../models/GameEvent');

// create a new event
router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    const {errors, isValid} = validateGameEvent(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
     
    const eventFields = {};
    eventFields.user = req.user.id;
    
    if(req.body.event_name) eventFields.event_name = req.body.event_name;
    if(req.body.sport_type) eventFields.sport_type = req.body.sport_type;
    if(req.body.players_required) eventFields.players_required = req.body.players_required;
    if(req.body.venue) eventFields.venue = req.body.venue;
    if(req.body.additional_info) eventFields.additional_info = req.body.additional_info;
    if(req.body.imageURL) eventFields.imageURL = req.body.imageURL;
    if(req.body.start) eventFields.start = req.body.start;
    
    new GameEvent(eventFields).save().then(event => res.json(event));
});


module.exports = router;