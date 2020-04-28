import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container,
    Button
} from 'reactstrap';

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
                              <NavLink href="https://github.com/rishipr/mern-auth">Github</NavLink>
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
                                <Button color="primary">Sign In</Button> &nbsp;&nbsp;
                            </NavItem>
                            <br/>
                            <NavItem>
                                <Button color="danger">Sign Up</Button>
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