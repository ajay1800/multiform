import { useState } from 'react';
import {
	MultiFormPayload,
	MultiFormValidation,
} from '../../models/multiFormModel/multiFormModel';

const MultiFormComponent = () => {
	const [file, setFile] = useState<string>('');

	const [images, setImages] = useState([]);
	const handleMultipleImages = (evnt: any) => {
		const selectedFIles: any = [];
		const targetFiles = evnt.target.files;
		const targetFilesObject = [...targetFiles];
		targetFilesObject.map((file) => {
			return selectedFIles.push(URL.createObjectURL(file));
		});
		setImages(selectedFIles);
	};
	const [formData, setFormData] = useState<MultiFormPayload>({
		firstName: '',
		lastName: '',
		email: '',
		dateOfBirth: '',
		contact: '',
	});

	const [error, setError] = useState<MultiFormPayload>({
		firstName: '',
		lastName: '',
		email: '',
		dateOfBirth: '',
		contact: '',
	});

	const [onNext, setOnNext] = useState<boolean>(false);

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (formData.firstName === '') {
			setError({ ...error, firstName: 'Enter First Name' });
		} else if (formData.lastName === '') {
			setError({ ...error, lastName: 'Enter Lirst Name' });
		} else if (formData.email === '') {
			setError({ ...error, email: 'Enter Email Address' });
		} else if (formData.dateOfBirth === '') {
			setError({ ...error, dateOfBirth: 'Select Date Of Birth' });
		} else {
			setOnNext(true);
		}
	};

	function handleChange(e: any) {
		console.log(e.target.files);
		setFile(URL?.createObjectURL(e.target.files[0]));
	}
	const regex =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	return (
		<div>
			{!onNext ? (
				<form onSubmit={(e) => submitHandler(e)}>
					<div>
						<label>First Name</label>
						<input
							type='text'
							placeholder='First Name'
							value={formData.firstName}
							onChange={(e) => {
								setError({ ...error, firstName: '' });
								setFormData({ ...formData, firstName: e.target.value });
							}}
						/>
						{error.firstName && <p> {error.firstName} </p>}
					</div>
					<div>
						<label>Last Name</label>
						<input
							type='text'
							placeholder='Last Name'
							value={formData.lastName}
							onChange={(e) => {
								setError({ ...error, lastName: '' });
								setFormData({ ...formData, lastName: e.target.value });
							}}
						/>
						{error.lastName && <p> {error.lastName} </p>}
					</div>
					<div>
						<label>Email</label>
						<input
							type='text'
							placeholder='Email'
							value={formData.email}
							onChange={(e) => {
								regex.test(e.target.value)
									? setError({ ...error, email: '' })
									: setError({ ...error, email: 'Invalid Email format' });
								setFormData({ ...formData, email: e.target.value });
							}}
						/>
						{error.email && <p> {error.email} </p>}
					</div>
					<div>
						<label>Date Of Birth</label>
						<input
							type='date'
							placeholder='Date Of Birth'
							value={formData.dateOfBirth}
							onChange={(e) => {
								new Date().getFullYear() -
									new Date(e.target.value).getFullYear() >=
								18
									? setError({ ...error, dateOfBirth: '' })
									: setError({
											...error,
											dateOfBirth: 'Age will Be greater or equal to 18',
									  });
								setFormData({ ...formData, dateOfBirth: e.target.value });
							}}
							max={
								new Date(
									new Date().getTime() - new Date().getTimezoneOffset() * 60000,
								)
									.toISOString()
									.split('T')[0]
							}
						/>
						{error.dateOfBirth && <p> {error.dateOfBirth} </p>}
					</div>
					<div>
						<label>Contact No.</label>
						<input
							type='number'
							placeholder='Contact No.'
							value={formData.contact}
							onChange={(e) => {
								e.target.value.length === 10
									? setError({ ...error, contact: '' })
									: setError({ ...error, contact: 'Enter 10 Digit number' });
								setFormData({ ...formData, contact: e.target.value });
							}}
							maxLength={10}
						/>
						{error.contact && <p> {error.contact} </p>}
					</div>
					<div>
						<button type='submit'>Next</button>
					</div>
				</form>
			) : (
				<form>
					<div>
						<input
							type='file'
							onChange={handleMultipleImages}
							accept='image/png, image/gif, image/jpeg'
							multiple
						/>
						{images.map((item, index) => (
							<img src={item} alt='img' width={'200px'} key={index} />
						))}
					</div>
					<div>
						<button type='submit'>Submit</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default MultiFormComponent;
