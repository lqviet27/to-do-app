import React from 'react';
import './Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput} from 'mdb-react-ui-kit';

const Signup = () => {
    return (
        <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol col="12">
                    <MDBCard
                        className="bg-dark text-white my-5 mx-auto"
                        style={{ borderRadius: '1rem', maxWidth: '400px' }}
                    >
                        <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                            <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
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

                            <button outline className="btn btn-dark mx-2 px-5 border-white" color="white" size="lg">
                                Create
                            </button>

                            <div className="mt-3">
                                <p className="mb-0">
                                    Have an account?{' '}
                                    <a href="#!" class="text-white-50 fw-bold">
                                        Sign In
                                    </a>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Signup;
