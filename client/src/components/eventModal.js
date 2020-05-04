import React, {Component} from 'react';
import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';

import {addEvent} from '../actions/eventAction';

//import PropTypes from 'prop-types';



class EventModal extends Component{
    state = {
        modal:false,
        event_name: '',
        sport_type: '',
        players_required:'',
        venue: '',
        additional_info:'',
        imageURL:'',
        start: ''

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const newEvent = {
            //id: uuid(),
            event_name: this.state.event_name,
            sport_type: this.state.sport_type,
            players_required: this.state.players_required,
            venue: this.state.venue,
            additional_info: this.state.additional_info,
            imageURL: this.state.imageURL,
            start: this.state.start
           

        }

        //add item via additem action
        this.props.addEvent(newEvent);
       
        this.toggle();//closing modal
    }
    render(){
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Item</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle={this.toggle}> Create a new event</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Event Name:</Label>
                                <Input
                                    type="text"
                                    name="event_name"
                                    id="item"
                                    placeholder="Add event name"
                                    onChange={this.onChange}
                                    >

                                </Input>
                                <Label for="item">Sport Type:</Label>
                                <Input
                                    type="text"
                                    name="sport_type"
                                    id="item"
                                    placeholder="Add sport type"
                                    onChange={this.onChange}
                                    >

                                </Input>
                                <Label for="item">Players required:</Label>
                                <Input
                                    type="text"
                                    name="players_required"
                                    id="item"
                                    placeholder="Number of players"
                                    onChange={this.onChange}
                                    >

                                </Input>
                                <Label for="item">Event Venue:</Label>
                                <Input
                                    type="text"
                                    name="venue"
                                    id="item"
                                    placeholder="Add event venue"
                                    onChange={this.onChange}
                                    >

                                </Input>
                                <Label for="item">Additional Info:</Label>
                                <Input
                                    type="text"
                                    name="additional_info"
                                    id="item"
                                    placeholder="Any additional info?"
                                    onChange={this.onChange}
                                    >

                                </Input>
                                <Label for="item">Image url:</Label>
                                <Input
                                    type="text"
                                    name="imageURL"
                                    id="item"
                                    placeholder="Image"
                                    onChange={this.onChange}
                                    >

                                </Input>
                                <Label for="item">Start date:</Label>
                                <Input
                                    type="date"
                                    name="start"
                                    id="item"
                                    placeholder="Start date/time"
                                    onChange={this.onChange}
                                    >

                                </Input>





                                    <Button
                                    color ="dark"
                                    style={{marginTop:'2rem'}} block
                                    >
                                        Add Event
                                    </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    // event_name : state.event_name,
    // venue :state.venue,

    item :state.item
});

export default connect(
    mapStateToProps,
    {addEvent}
)
(EventModal);