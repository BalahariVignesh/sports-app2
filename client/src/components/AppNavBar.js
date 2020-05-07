import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
 
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
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user?`Welcome ${user.name}`:``}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <EditProfileModal/>
                </NavItem>
                <NavItem>
                     <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Button color="primary"><LoginModal/></Button> &nbsp;&nbsp;
                </NavItem>
                <br/>
                <NavItem>
                    <Button color="danger"><RegisterModal /></Button>
                </NavItem>
            </Fragment>
        );

        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href ="/">Sportify</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            
                            <NavItem>
                                <NavLink > Events</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink > How it works?</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink > Contact us!</NavLink>
                            </NavItem>
                            {isAuthenticated? authLinks:guestLinks}
                          
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );

        
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavBar);