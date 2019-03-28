import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import CustomFormGroup from "../../components/CustomFormGroup";
import Redirect from "react-router/Redirect";
import axios from "axios";
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

export default class SignUpPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			description: '',
			profileType: ('',''),
			snowSports: ('','',''),
			landSports: ('','',''),
            waterSports: ('','',''),
            airSports: ('','',''),
			redirect: false
		}
	}

	// Validates form for style purposes and so that we cannot send empty data to api
	validateForm() {
		const { username, password} = this.state;

		return username.length > 0 &&

			password.length > 0;
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	// Handles state change for each input in the state object
	handleChange1 = event => {
		this.setState({
			snowSports: event.target.value
		});

	};

	// Handles state change for each input in the state object
	handleChange2 = event => {
		this.setState({
			landSports : event.target.value
		});

	};


	// Handles state change for each input in the state object
	handleChange3 = event => {
		this.setState({
			profileType: event.target.value

		});

	};

    handleChange4 = event => {
        this.setState({
            waterSports: event.target.value
        });

    };

    // Handles state change for each input in the state object
    handleChange5 = event => {
        this.setState({
            airSports : event.target.value
        });

    };


	handleUserChange = event => {


		this.setState({

			[event.target.id]: event.target.value
		});

	};

	handleSubmit = e => {
		e.preventDefault();
		console.log('Submitted form:', this.state);

		axios.post('http://localhost:8000/users', {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email,
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			description: this.state.description,
			type: [this.state.profileType],
			snow_sports: [this.state.snowSports],
			water_sports: [this.state.waterSports],
			land_sports: [this.state.landSports],
			air_sports: [this.state.airSports]


		})
			.then(results => {
				this.setState( {userId : results.data.check })	;

				if(this.state.userId > 0) {
					alert("created profile userId: " + this.state.userId);
					localStorage.setItem('userId', this.state.userId);
					this.setState({redirect: true});

				}
				else {
					alert("failed username is already taken");

					this.setState({redirect: false});
				}
			});

	};

	render() {
		console.log('State', this.state);
		const { redirect } = this.state;
		if(redirect) {
			return <Redirect to={`/dashboard/profile/${localStorage.getItem('userId')}`}/>;
		}
		const { valueSnow } = this.state;
		const { valueLand } = this.state;
		const { valueType } = this.state;
        const { valueWater } = this.state;
        const { valueAir } = this.state;
		return (

			<div className="Login" style={{ height: '100%', top: '42%' }}>
				<h3 style={{ textAlign: 'center', marginTop: '5%' }}>Sign Up</h3>
				<form onSubmit={this.handleSubmit}>

					<CustomFormGroup value={this.state.username} label="Username"	controlId="username"
									 type="text"	onChange={this.handleUserChange} />

					<CustomFormGroup value={this.state.password} label="Password"	controlId="password"
									 type="password"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.email} label="email"	controlId="email"
									 type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.firstName} label="First Name"	controlId="firstName"
						type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.lastName} label="Last Name"	controlId="lastName"
						type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.description} label="Description(something about yourself)"	controlId="description"
									 type="text"	onChange={this.handleChange} />

					<Form.Group controlId="winter sport type">

						<Form.Label>Winter Sport Type</Form.Label>
						<Form.Control value={valueSnow} placeholder="Select a Sport" onChange={this.handleChange1} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option> </option>
							<option value ='snowboard'>Snowboard</option>
							<option value = 'ski'>Ski</option>
							<option value = 'snowmobile'>Snowmobile</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="land sport type">
						<Form.Label>Land Sport Type</Form.Label>
						<Form.Control value={valueLand} placeholder="Select a Sport" onChange={this.handleChange2} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option> </option>
							<option value = 'skateboard'>Skateboard</option>
							<option value = 'BMX'>BMX</option>
						</Form.Control>
					</Form.Group>
                    <Form.Group controlId="water sport type">

                        <Form.Label>Water Sport Type</Form.Label>
                        <Form.Control value={valueWater} placeholder="Select a Sport" onChange={this.handleChange4} as="select">
                            <option disabled value={-1}>Select an option...</option>
                            <option> </option>
                            <option value ='surf'>Surf</option>
                            <option value = 'waterski'>water Ski</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="air sport type">
                        <Form.Label>Air Sport Type</Form.Label>
                        <Form.Control value={valueAir} placeholder="Select a Sport" onChange={this.handleChange5} as="select">
                            <option disabled value={-1}>Select an option...</option>
                            <option> </option>
                            <option value = 'skydive'>Sky Dive</option>
                            <option value = 'hangglide'>Hang Glide</option>
                        </Form.Control>
                    </Form.Group>

					<Form.Group controlId="profileType">
						<Form.Label>Profile Type (required)</Form.Label>
						<Form.Control value={valueType} placeholder="Select type of profile..." onChange={this.handleChange3} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option value = 'athlete'>Athlete</option>
							<option value = 'photographer'>Photographer</option>
						</Form.Control>
					</Form.Group>

					<Button style={{ marginTop: '20px' }}	block disabled={!this.validateForm()} type="submit">Create Account!</Button>
				</form>
			</div>
		);
	}
}