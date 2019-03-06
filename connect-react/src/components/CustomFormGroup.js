import React from 'react'
import {Form, FormControl, FormGroup} from "react-bootstrap";

const CustomFormGroup = (props) => {
	return (
		<FormGroup style={{ marginBottom: '0.5rem' }} controlId={props.controlId}>
			<Form.Label>{props.label}</Form.Label>
			<FormControl
				value={props.value}
				onChange={props.onChange}
				type={props.type}
			/>
		</FormGroup>
	);
}

export default CustomFormGroup;