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

import {register} from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component{
    state = {
        modal:false,
        name: '',
        email:'',
        password:'',
        password2:'',
        msg:[]
    };
    
    static propTypes ={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if(error != prevProps.error){
            //check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: [error.msg.name, error.msg.email, error.msg.password, error.msg.password2]});
            }else{
                this.setState({msg:null})
            }
        }
        //if authenticated then close the modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
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
        const {name, email, password, password2} = this.state;

        //create user object
        const newUser = {
            name, 
            email,
            password,
            password2
        };
        //attempting to register
        this.props.register(newUser);

    };
    render(){
        return(
            <div>
              <NavLink onClick={this.toggle} href="#">
                Register
              </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle={this.toggle}> Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color='danger'>{this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                    <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                  
                                    >

                                    </Input>
                                    {this.state.msg ? (<Alert color='danger'>{this.state.msg[0]}</Alert>):null}
                                <Label for="email">email</Label>
                                    <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    >

                                    </Input>
                                    {this.state.msg ? (<Alert color='danger'>{this.state.msg[1]}</Alert>):null}
                                <Label for="password">Password</Label>
                                    <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    >

                                    </Input>
                                    {this.state.msg ? (<Alert color='danger'>{this.state.msg[2]}</Alert>):null}
                                <Label for="password2">Confirm Password</Label>
                                    <Input
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    placeholder="confirm password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    >

                                    </Input>
                                    {this.state.msg ? (<Alert color='danger'>{this.state.msg[3]}</Alert>):null}
                                    <Button
                                    color ="dark"
                                    style={{marginTop:'2rem'}} block
                                    >
                                        Register
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
   isAuthenticated: state.auth.isAuthenticated,
   error: state.error
});

export default connect(
    mapStateToProps,
    { register, clearErrors }
)(RegisterModal);