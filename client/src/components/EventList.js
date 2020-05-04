import React, {Component} from'react';
import {Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';


import {connect} from 'react-redux';
import {getEvents, deleteEvent, joinEvent} from '../actions/eventAction';
import PropTypes from 'prop-types';


class EventList extends Component{
    componentDidMount(){
        //store.dispatch(loadUser());
        this.props.getEvents();
    }

    onDeleteClick = (id) =>{
        this.props.deleteEvent(id);

    }
    onJoinClick = (id) =>{
        const event = {
            id: id
        }
        this.props.joinEvent(event);
    }


    render() {

        const { items } = this.props.item;
       
        return(
            <Container>
               
                <ListGroup>
                    <TransitionGroup className="event-list">
                        {items && items.map(({_id, event_name,sport_type,players_required,venue,additional_info,imageURL,start}) =>
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                                            
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
                                    
                                    onClick={this.onDeleteClick.bind(this,_id)}
                                    > Delete</Button>
                                    <Button 
                                    className="join-btn" 
                                    color ="danger" 
                                    onClick={this.onJoinClick.bind(this,_id)}
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
    item: state.item,
    event: state.event, 
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {getEvents, deleteEvent, joinEvent})
    (EventList);