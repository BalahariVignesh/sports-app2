import React, {Component} from'react';
import {Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'react-uuid';

import {connect} from 'react-redux';
import {getEvents} from '../actions/eventAction';

import PropTypes from 'prop-types';


class EventList extends Component{
    componentDidMount(){
        this.props.getEvents();
    }


    render() {

        const { items } = this.props.item;
        return(
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={()=>{
                        const name = prompt('Enter item');
                        if(name){
                            this.setState(state=> ({
                                items: [...state.items, {id:uuid(), event_name: name}]
                            }))
                        }
                    }}
                > Add new Event</Button>
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
                                    
                                    onClick={()=> {
                                        this.setState(()=> ({
                                            items: this.state.items.filter(item => item.id !== id)
                                        }));
                                    }

                                    }
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

export default connect(mapStateToProps,{getEvents})(EventList);