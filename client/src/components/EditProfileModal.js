import React, {Component} from 'react';
import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 

    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {editUser} from '../actions/authActions';
import {clearErrors} from '../actions/errorActions';
import {getEvents} from '../actions/eventAction';
import store from '../store';
class EditProfileModal extends Component{
    state = {
        modal:false,
        isOrganiser:null,
        msg:null
    };
    
    static propTypes ={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if(error != prevProps.error){
            //check for register error
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg:[error.msg.msg]});
            }else{
                this.setState({msg:null})
            }
        }
        
      
    }
    toggle = () => {
        //to clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        const auth = this.props.auth;
        const {name, isOrganiser} = this.state;
        const user = {
            id:auth.user._id,
            name, 
            isOrganiser
        }
        //login attempt
        this.props.editUser(user);
       //if submitted then close the modal
       if(this.state.modal){
        //if(isAuthenticated){
            //store.dispatch(getEvents());
            this.toggle();
            
       // }
    }

 
    };
    render(){
        return(
            <div>
              <NavLink onClick={this.toggle} href="#">
                Edit User Profile
              </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle={this.toggle}> Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color='danger'>{this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                               
                                <Label for="name">name</Label>
                                    <Input
                                    type="name"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    >

                                    </Input>
                                    <Label for="organiser">
                                            
                                          &nbsp;&nbsp;  <Input
                                            type="radio"
                                            name="isOrganiser"
                                            id="organiser"
                                            className="mb-3"
                                            value='true'
                                            onChange={this.onChange}
                                            >
                                            
                                            </Input>
                                            Organiser
                                        </Label>
                                       <br/>
                                        
                                    
                                        <Label for="player">
                                            
                                        &nbsp;&nbsp;    <Input
                                            type="radio"
                                            name="isOrganiser"
                                            id="player"
                                            className="mb-3"
                                            value='false'
                                            onChange={this.onChange}
                                            >
                                            
                                            </Input>
                                            Player
                                        </Label>
                                
                                    <Button
                                    color ="dark"
                                    style={{marginTop:'2rem'}} block
                                    >
                                    Update
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
    auth: state.auth,
   error: state.error
});

export default connect(
    mapStateToProps,
    {editUser, clearErrors}
)(EditProfileModal);