const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')


const validateGameEvent = require('../../validation/event');

const GameEvent = require('../../models/GameEvent');

// @route   GET api/events
// @desc    Get All events
// @access  public
// fetch all events
router.get('/',auth, (req, res) => {
    Event.find()
        
        //.populate('user', ['name'])
        .then(events => {
            
            res.json(events);
        })
        .catch(err => 
            res.status(404).json({error: "Error in get api/events/all. " + err})
        );
});

// @route   POST api/events
// @desc    Create an event
// @access  private

// create a new event
router.post('/',auth ,(req, res) => {
    const {errors, isValid} = validateGameEvent(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
     
    const eventFields = {};
    eventFields.user = req.user.id;
    console.log(`user id is ${req.user.id}`);
    if(req.body.event_name) eventFields.event_name = req.body.event_name;
    if(req.body.sport_type) eventFields.sport_type = req.body.sport_type;
    if(req.body.players_required) eventFields.players_required = req.body.players_required;
    if(req.body.venue) eventFields.venue = req.body.venue;
    if(req.body.additional_info) eventFields.additional_info = req.body.additional_info;
    if(req.body.imageURL) eventFields.imageURL = req.body.imageURL;
    if(req.body.start) eventFields.start = req.body.start;
    
    new GameEvent(eventFields).save()
    .then(event => res.status(200).json(event));
});

// @route   PUT api/events/:id/
// @desc    find an event by Id
// @access  public


router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .populate('user', ['name'])
        .then(event => res.json(event))
        .catch(err =>
            res.status(404).json({error: "Error in get api/events/:id. " + err})
        );
});

// @route   PUT api/events/:id/join
// @desc    Join an event
// @access  private

router.put('/:id/join', auth, (req, res) => {
   
    Event.findById(req.params.id)
        //.populate('user', ['name'])
        .then(event => {
            if(!event){
                return res.status(404).json({msg: 'This event is no longer available:',
            event:event});
            }
            
            let count = 0;
            
            for(let i of event.players_list){
                if(i["id"] === req.user.id){
                    return res.status(400).json({msg: 'You already joined this event:', event:event});
                }
                count++;
            }
            
            if(count >= event.players_required){
                return res.status(400).json({msg: 'This event is currently full:', event:event});
            }
            
            const userName = req.body.user_name;
            
            const newPlayer = {
                id: req.body.user_id,
                name: userName
            };
            console.log(newPlayer);
            event.players_list.push(newPlayer);
            return event.save();
        })
        .then(result => {
           
            res.status(200).json({
                msg: 'Success on joining that event',
                event: result
            });
        })
        .catch(err => res.status(404).json({error: "Error in put api/events/:id/join. " + err}));
});

module.exports = router;