import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
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
                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                <MDBInput
                                    wrapperClass="mb-4 mx-5 w-100"
                                    labelClass="text-white"
                                    label="Email address"
                                    id="formControlLg"
                                    type="email"
                                    size="lg"
                                />
                                <MDBInput
                                    wrapperClass="mb-4 mx-5 w-100"
                                    labelClass="text-white"
                                    label="Password"
                                    id="formControlLg"
                                    type="password"
                                    size="lg"
                                />

                                <p className="small mb-3 ">
                                    <a class="text-white-50" href="#!">
                                        Forgot password?
                                    </a>
                                </p>
                                <button outline className="btn btn-dark mx-2 px-5 border-white" color="white" size="lg">
                                    Login
                                </button>

                                <div className="mt-3">
                                    <p className="mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/signup" class="text-white-50 fw-bold">
                                            Sign Up
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

export default Signin;
