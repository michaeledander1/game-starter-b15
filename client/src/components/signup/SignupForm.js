import React, {PureComponent} from 'react'
import './SignupForm.css'

export default class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="signup-form">
  			<form onSubmit={this.handleSubmit}>
				  <label>
            First Name
            <input type="firstName" name="firstName" value={
  						this.state.firstName || ''
  					} onChange={ this.handleChange } />
          </label>
					<label>
            Last Name
            <input type="lastName" name="lastName" value={
  						this.state.lastName || ''
  					} onChange={ this.handleChange } />
          </label>
					
					<label>
            Email
            <input type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </label>
  					
  				<label>
            Password
  					<input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
  				</label>

  				<label>
            Confirm password
  					<input type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<button type="submit">Sign up</button>
  			</form>
      </div>
		)
	}
}
