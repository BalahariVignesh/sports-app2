import React, {Component} from'react';
import {Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'react-uuid';

import {connect} from 'react-redux';
import {getEvents, deleteEvent} from '../actions/eventAction';

import PropTypes from 'prop-types';


class EventList extends Component{
    componentDidMount(){
        this.props.getEvents();
    }

    onDeleteClick = (id) =>{
        this.props.deleteEvent(id);

    }


    render() {

        const { items } = this.props.item;
        return(
            <Container>
               
                <ListGroup>
                    <TransitionGroup className="event-list">
                        {items.map(({id, event_name,sport_type,players_required,venue,additional_info,imageURL,start}) =>
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                                            
                                <ListGroupItem>
                                    {event_name}
                                    <br/>
                                    {sport_type}
                                    <br/>
                                    {players_required}
                                    <br/>
                                    {venue}
                                    <br/>
                                    {additional_info}
                                    <br/>
                                    {imageURL}
                                    <br/>
                                    {start}
                                    <br/>
                                    <Button 
                                    className="join-btn" 
                                    color ="danger" 
                                    
                                    onClick={this.onDeleteClick.bind(this,id)}
                                    > Delete</Button>
                                    <Button 
                                    className="join-btn" 
                                    color ="danger" 
                                    
                                   

                                    
                                    > Join</Button>
                                </ListGroupItem>

                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

EventList.propTypes = {
    getEvents: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(
    mapStateToProps,
    {getEvents, deleteEvent})
    (EventList);