import React, {Component} from 'react';
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
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

class AppNavBar extends Component {
    state = {
        isOpen:false
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href ="/">Sportify</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <RegisterModal />
                            </NavItem>
                            <NavItem>
                                <NavLink > Events</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink > How it works?</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink > Contact us!</NavLink>
                            </NavItem>
                            <NavItem>

                                <Button color="primary"><LoginModal/></Button> &nbsp;&nbsp;
                            </NavItem>
                            <br/>
                            <NavItem>
                                <Button color="danger"><RegisterModal /></Button>
                            </NavItem>
                            <NavItem>
                                <Logout/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );

        
    }
}


export default AppNavBar;