import React, {Component} from'react';
import {Container, ListGroup, ListGroupItem, Button, Alert, Toast } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';


import {connect} from 'react-redux';
import {getEvents, deleteEvent, joinEvent} from '../actions/eventAction';
import PropTypes from 'prop-types';

import {clearErrors} from '../actions/errorActions';

import EventItem from './EventItem';

class EventList extends Component{
    state = {
        msg:null,
        event:{
            _id:null,
            event_name:null
        }
    }
    componentDidMount(){
        //store.dispatch(loadUser());
        this.props.getEvents();
        this.props.clearErrors();
       
    }

    onDeleteClick = (id) =>{
        this.props.deleteEvent(id);

    }
      
    onJoinClick = (id) =>{
        console.log('join cicked', id);
        Toast.success('Joined');
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const event = {
            id: id,
            user_id: user.id,
            user_name: user.name,
            }
        this.props.joinEvent(event);
    }
    static propTypes ={
        //isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        //login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps){
        const {error} = this.props;
        if(error != prevProps.error){
            //check for join event error
            if(error.id === 'JOIN_FAIL'){
                this.setState({msg:error.msg.msg,
                //event:error.msg.event.event_name
            });
            }else{
                this.setState({msg:null  ,event:null})
            }
        }
     }

    render() {

        const { items } = this.props.item;
       
        return(
            <Container>
               
                <ListGroup>
               
                   <EventItem items= {items}/>
                </ListGroup>
            </Container>
        );
    }
}

EventList.propTypes = {
    getEvents: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    event: state.event, 
    auth: state.auth,
    user: state.auth.user,
    error: state.error
})

export default connect(
    mapStateToProps,
    {getEvents, deleteEvent, joinEvent,clearErrors})
    (EventList);