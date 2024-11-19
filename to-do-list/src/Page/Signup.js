import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { authApi } from '../api/api';
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = () => {
        if (password !== confirmPassword) {
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!email || !username || !password || !confirmPassword) {
            toast.error('All fields are required!');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Invalid email format!');
            return;
        }

        if (!validatePassword()) {
            toast.error('Passwords do not match!');
            return;
        }

        const userData = {
            email,
            username,
            password,
        };
        const res = await authApi.signUp(userData);
        console.log(res.data);
        if (res.data.ec === 0) {
            toast.success('Registration successful!');
            navigate('/signin');
        } else {
            toast.error(res.data.em);
        }
    };

    return (
        <div className="bg-gradient-custom vh-100 d-flex align-items-center justify-content-center">
            <MDBContainer fluid>
                <MDBRow className="d-flex justify-content-center align-items-center h-100">
                    <MDBCol col="12">
                        <MDBCard
                            className="bg-dark text-white my-5 mx-auto"
                            style={{ borderRadius: '1rem', maxWidth: '400px' }}
                        >
                            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                                <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                                <p className="text-white-50 mb-5">Please enter your info!</p>

                                <MDBInput
                                    wrapperClass="mb-4 mx-5 w-100"
                                    labelClass="text-white"
                                    label="Email address"
                                    id="formControlLg"
                                    type="email"
                                    size="lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass="mb-4 mx-5 w-100"
                                    labelClass="text-white"
                                    label="User Name"
                                    id="formControlLg"
                                    type="text"
                                    size="lg"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass="mb-4 mx-5 w-100"
                                    labelClass="text-white"
                                    label="Password"
                                    id="formControlLg"
                                    type="password"
                                    size="lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass="mb-4 mx-5 w-100"
                                    labelClass="text-white"
                                    label="Confirm Password"
                                    id="formControlLg"
                                    type="password"
                                    size="lg"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <button
                                    outline
                                    className="btn btn-dark mx-2 px-5 border-white"
                                    color="white"
                                    size="lg"
                                    onClick={handleSubmit}
                                >
                                    Create
                                </button>

                                <div className="mt-3">
                                    <p className="mb-0">
                                        Have an account?{' '}
                                        <Link to="/signin" class="text-white-50 fw-bold">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Signup;
