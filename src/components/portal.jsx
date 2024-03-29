import React from 'react'
import { inject, observer } from 'mobx-react'
import { NavLink, withRouter } from 'react-router-dom'


@inject('AuthStore')
@withRouter
@observer
class Portal extends React.Component {

	// TODO: add useruuid to links
	render() {
		return (
			<div className="portal-container">
				<div className="portal__left-group">

					<NavLink exact to="/" 
						className="portal__item portal__brand"
						>Bolt
					</NavLink>
					<div className="portal__separator"></div>

					<NavLink exact to="/events" 
						className="portal__item"
						activeClassName="portal__item-active"
						>Events
					</NavLink>
					<div className="portal__separator"></div>

					<NavLink exact to="/food" 
						className="portal__item"
						activeClassName="portal__item-active"
						>Food
					</NavLink>
					<div className="portal__separator"></div>

					<NavLink to="/open" 
						className="portal__item"
						activeClassName="portal__item-active"
						>Open Now</NavLink>
					<div className="portal__separator"></div>

					<NavLink to="/event/create" 
						className="portal__item"
						activeClassName="portal__item-active"
						>Plan an Event</NavLink>
				</div>


				<div className="portal__right-group">

					{ this.props.AuthStore.loggedIn 
					? (
						<div className="portal__chunk">
							<NavLink to="/browse" 
								className="portal__item"
								activeClassName="portal__item-active"
								>Browse</NavLink>
							<div className="portal__separator"></div>

							<NavLink to="/u/manage" 
								className="portal__item"
								activeClassName="portal__item-active"
								>My Pages</NavLink>
							<div className="portal__separator"></div>
						</div>

					)
					: (
						<div className="portal__chunk">
							<NavLink to="/register" 
								className="portal__item"
								activeClassName="portal__item-active"
								>Register</NavLink>
							<div className="portal__separator"></div>

							<NavLink to="/login"
								className="portal__item" 
								activeClassName="portal__item-active"
								>Log In</NavLink>
						</div>

					)

					}
				</div>
			</div>

		)
	}
}


//@inject('AuthStore')
//class RegisterLoginOrProfile extends React.Component {
	//render() {
		//return (

		//)
	//}
//}

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
