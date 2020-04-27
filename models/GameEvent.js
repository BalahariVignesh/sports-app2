const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    event_name: {
        type: String,
        required: true
    },
    sport_type: {
        type: String,
        required: true
    },
    players_required: {
        type: Number,
        required: true
    },
    players_list: [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    venue: {
        type: String
    },
    additional_info: {
        type: String
    },
    imageURL: {
        type: String
    },
    
    date:{
        type: Date,
        default: Date.now
    },
    start: {
        type: Date,
    }
});

module.exports = Event = mongoose.model('sportevent', EventSchema);