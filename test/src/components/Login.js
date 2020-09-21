import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import UserDataService from "../services/user.service";



class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.update = this.update.bind(this);
	}

	update(e) {
        const { name, value } = e.target;
		this.setState({ [name]: value });
		localStorage.setItem('loginEmail', this.state.email);
	}

	
	handleClick(e) {
		e.preventDefault();
		var email = this.state.email;
		var inputpass = this.state.password;

		console.log(email);

		const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

		if (email === '' || (!expression.test(String(email).toLowerCase()))) {
			alert("Please fill out your E-mail.");
		} else if (inputpass === '' || inputpass.length < 6) {
			alert("Please fill out your password.");
		} else {
			var row = UserDataService.get(this.state.email);
			console.log("Get in the function");
			var self = this;
			row.then(function (result) {
				console.log("Data get");
				if (result.data === '') {
					alert("Account does not exist!");
				} else {
					var hashed = result.data.password;
					var passwordHash = require('password-hash');
					if (passwordHash.verify(inputpass, hashed)) {
						console.log('You are logged in');
						var userAccountType = result.data.account_type;
						console.log(userAccountType);

						if (userAccountType === 'admin') {
							self.props.history.push("/admin");
						} else {
							self.props.history.push("/home");
						}
					} else {
						alert("Your password is incorrect.");
					}
				}
				console.log(result.data);
			});
		}
	}

	render() {
		return (
			<div className="login">

				<form >
					<h2>Login</h2>
					<h3>Welcome to WUNDERgrubs</h3>
					<div className="username">
						<input
							type="text"
							placeholder="Email..."
							value={this.state.email}
							onChange={this.update}
							name="email"
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.update}
							name="password"
						/>
					</div>

					<button onClick = {this.handleClick.bind(this)} ref={(button) => this.button = button} > Login </button>
				</form>
				
				<Link className="link" to="/register">Create an account</Link>				

			</div>
		);
	}

}



export default withRouter(Login);
