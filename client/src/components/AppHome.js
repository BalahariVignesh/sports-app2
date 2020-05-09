import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    Container,
    Button
} from 'reactstrap';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import EditProfileModal from './EditProfileModal';

class AppNavBar extends Component {
    state = {
        isOpen:false
    }

    static propTypes={
        auth: PropTypes.object.isRequired
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        const { isAuthenticated, user} =this.props.auth;
    

        const authLinks = (
            <Fragment>
                 <Col></Col>
                    <Col>                    
                        <img className="logo-margin-afterlogin"src={require('./assets/logo.png')}/>
                    </Col>
                    <Col>
                    <Row><br/><br/><br/><br/><br/><br/><br/><br/><br/></Row>
                    <div className="login-margin-afterlogin">
                    <h2>
                            <strong>{user?`Welcome ${user.name} !!!`:``}</strong>
                        </h2>
                        <Row>
                            <Button color="success"><EditProfileModal/></Button> &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button color="danger"><Logout/></Button> 
                        </Row>
                    </div>
                        
                        
                    </Col>
                    <Col>

                    </Col>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <Col md={6}>                    
                    <img className="logo-margin" src={require('./assets/logo.png')}/>
                </Col>
                <Col md={6}>
                    <Fragment>
                            <Row className="login-margin">
                                <Button color="primary" style={{color:"white"}}><LoginModal/></Button>
                                <h6 className="or">OR</h6>
                                <Button color="danger"><RegisterModal /></Button>
                            </Row>
                    </Fragment>
                </Col>
            </Fragment>
            
        );

        return(
            <div className="page-body-image">
                
                        <Navbar color="light" dark expand="sm" className="mb-5">
                            <NavbarBrand href ="/">
                                <img src={require('./assets/logo.png')} style={{width:"120px"}}/>
                            </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    
                                    {/* <NavItem>
                                        <NavLink > Events</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink > How it works?</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink > Contact us!</NavLink>
                                    </NavItem> */}
                                    
                                
                                </Nav>
                            </Collapse>
                    </Navbar>

                <Row>
                    {isAuthenticated? authLinks:guestLinks}
                </Row>
            
        </div>
        );

        
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavBar);