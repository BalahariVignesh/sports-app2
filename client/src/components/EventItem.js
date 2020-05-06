
import { ListGroupItem, Button, Alert } from 'reactstrap';
import React, { Component } from 'react';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEvents, deleteEvent, joinEvent} from '../actions/eventAction';
import {clearErrors} from '../actions/errorActions';

class EventItem extends Component {
    
    onDeleteClick = (id) =>{
        this.props.deleteEvent(id);

    }
      
    onJoinClick = (id) =>{
        console.log('join cicked', id);
        
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
                event:{
                    name: error.msg.event.event_name}

            });
            }else if(error.id === 'DELETE_EVENT_FAIL'){
                this.setState({msg:error.msg.msg,
                     event:{
                         name: error.msg.event.event_name}
    
                });
            }else{
                
                this.setState({msg:null  ,event:null})
                
            }
        }
     }

    render() {
        const { items } = this.props.item;
        return (
            <div>
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
                                    > Join</Button> &nbsp;
                                {(this.state.msg && (this.state.event.name === event_name) )? 
                                (<Alert color='danger'>{this.state.msg} {this.state.event.name}</Alert>):
                                null}                                          
                                </ListGroupItem>

                            </CSSTransition>
                        )}
                    </TransitionGroup>
                    
            </div>
        )
    }
}
EventItem.propTypes = {
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
    mapStateToProps,{clearErrors,joinEvent,deleteEvent})
    (EventItem);