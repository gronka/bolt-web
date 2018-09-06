import React from 'react'
import { NavLink } from 'react-router-dom'


class Portal extends React.Component {

	render() {
		return (
			<div className="portal-container">
				<div className="portal__left-group">

					<div className="portal__item portal__brand">
						Bolt
					</div>
					<div className="portal__separator"></div>

					<NavLink to="/events" 
						className="portal__item"
						>Events
					</NavLink>
					<div className="portal__separator"></div>

					<NavLink to="/food" 
						className="portal__item"
					>Food
					</NavLink>
					<div className="portal__separator"></div>

					<NavLink to="/open" 
						className="portal__item"
					>Open Now</NavLink>
				</div>

				<div className="portal__right-group">
					<NavLink to="/event/create" className="portal__item">Plan an Event</NavLink>
					<div className="portal__separator"></div>

					<NavLink to="/register" className="portal__item">Register</NavLink>
					<div className="portal__separator"></div>

					<NavLink className="portal__item" to="/login">Log In</NavLink>
				</div>
			</div>

		)
	}
}

  //<Navbar collapseOnSelect>

    //<Navbar.Collapse>
      //<Nav>
        //<LinkContainer to="/">
          //<NavItem eventKey={1}>
            //Events
          //</NavItem>
        //</LinkContainer>
        //<LinkContainer to="/food">
          //<NavItem eventKey={2}>
            //Food
          //</NavItem>
        //</LinkContainer>
        //<LinkContainer to="/open">
          //<NavItem eventKey={3}>
            //Open Now
          //</NavItem>
        //</LinkContainer>
      //</Nav>

      //<Nav pullRight>
        //<LinkContainer to="/event/create">
          //<NavItem eventKey={4}>
            //Plan an Event
          //</NavItem>
        //</LinkContainer>
        //<LinkContainer to="/register">
          //<NavItem eventKey={5}>
            //Register
          //</NavItem>
        //</LinkContainer>
        //<LinkContainer to="/login">
          //<NavItem eventKey={6}>
            //Login
          //</NavItem>
        //</LinkContainer>
      //</Nav>
    //</Navbar.Collapse>

    
  //</Navbar>


export default Portal
