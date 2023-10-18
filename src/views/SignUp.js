import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import site from "../assets/img/profileGenerator.png";
import GoogleButton from 'react-google-button'
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpSchema } from "./validationSchema";
import { error } from "jquery";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
// import GoogleLogin from '@leecheuk/react-google-login';
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';



function SignUp() {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Create Account"); // Add button text state
  const [buttonColor, setButtonColor] = useState("#405cf5"); // Add button color state
  let history = useHistory();
  const responseGoogle2 = (response) => {
    const user = {
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      username: "",
      email: response.profileObj.email,
      password: "Aish@123",
      password1: "Aish@123",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((e) => {});
    localStorage.setItem(
      "login",
      JSON.stringify({
        login: true,
        token: response.accessToken,
      })
    );
    localStorage.setItem(
      "userName",
      JSON.stringify({
        fname: response.profileObj.name,
        email: response.profileObj.email,
      })
    );
    if (response.accessToken) {
      toast.success("Success Notification !");
      history.push("/admin/profile-generator");
    }
  };
  const responseGoogle = async () => {
    try {
      const apiResponse = await axios.post('http://16.171.147.89/google/');
      console.log(apiResponse.data);
      // Perform any further actions with the API response data
    } catch (error) {
      console.error(error);
      // Handle error scenarios
    }
  };

  // using Formik
  const formInitialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password1: "",
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values, action) => {
      setLoading(true);
      setButtonText("Please wait"); // Update button text
      setButtonColor("#ccc"); // Update button color
      const user = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        password: values.password,
        password1: values.password1,
      };

      // Fetch Api for Register
      fetch(`${process.env.REACT_APP_BASE_URL}register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data emails issss',data.email);
          
          if (data.email) {
            toast.error(data.email[0], {
              position: toast.POSITION.TOP_CENTER,
              className: "toast-message",
            });
          }

          else{
             history.push("/signIn"); // Redirect to the sign-in page
          }
             
          
          setLoading(false);
          setButtonText("Create Account"); // Reset button text
          setButtonColor("#2ddb81"); // Reset button color
          // history.push("/signIn"); // Redirect to the sign-in page
        })
        .catch((e) => {
          setLoading(false);
          setButtonText("Create Account"); // Reset button text
          setButtonColor("#2ddb81"); // Reset button color
        });
    },
  });
 
  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: "", height: "100vh", padding: "0px" }}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Row style={{ backgroundColor: "" }}>
          <Col
            md={6}
            style={{
              backgroundColor: "#161816",
              padding: "40px",
              height: "100vh",
              position: "relative",
            }}
          >
            <img
              src={site}
              alt=""
              srcSet=""
              width="150"
              style={{ marginLeft: "50px", marginTop: "-50px" }}
            />

            <div
              style={{
                border: "",
                width: "70%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <h1
                style={{
                  fontWeight: "800",
                  fontFamily: "Nunito Sans",
                  color: "#fff",
                }}
              >
                Get Started with <br /> ProfileGenerator....{" "}
              </h1>
              <p
                style={{ color: "gray", margin: "30px 0", fontWeight: "bold" }}
              >
                Join hundreds of job seekers who use Profile Generator to submit
                better job applications in seconds—not hours.
              </p>

              <p style={{ color: "gray", fontWeight: "bold" }}>
                Already have an account?{" "}
                <span
                  style={{
                    color: "#2ddb81",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <Link to="/signin" className="sign_up_link">
                    {" "}
                    Sign In{" "}
                  </Link>
                </span>{" "}
              </p>
            </div>
          </Col>

          {/* Column 2 */}

          <Col
            md={6}
            style={{
              backgroundColor: "#212221",
              padding: "40px",
              height: "100vh",
              fontFamily: "Nunito Sans",
            }}
          >
            <Form onSubmit={formik.handleSubmit}>
              <Row
                style={{
                  backgroundColor: "",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* First Name*/}
                <Col sm={6} style={{ backgroundColor: "" }}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                      First Name
                    </Form.Label>
                    <Form.Control
                      className="signin_form"
                      type="text"
                      placeholder="Enter Your First Name"
                      name="first_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                    />

                    {formik.errors.first_name && formik.touched.first_name ? (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {" "}
                        {formik.errors.first_name}{" "}
                      </span>
                    ) : null}
                  </Form.Group>
                </Col>

                {/* Last Name*/}
                <Col sm={6} style={{ backgroundColor: "" }}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      className="signin_form"
                      type="text"
                      placeholder="Enter Your Last Name"
                      name="last_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                    />
                    {formik.errors.last_name && formik.touched.last_name ? (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {" "}
                        {formik.errors.last_name}{" "}
                      </span>
                    ) : null}
                  </Form.Group>
                </Col>

                {/* User Name*/}
                <Col sm={6} style={{ backgroundColor: "" }}>
                  {/*  First Name */}
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                      User Name
                    </Form.Label>
                    <Form.Control
                      className="signin_form"
                      type="text"
                      placeholder="Enter Your User Name"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {formik.errors.username && formik.touched.username ? (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {" "}
                        {formik.errors.username}{" "}
                      </span>
                    ) : null}
                  </Form.Group>
                </Col>

                {/* Email*/}

                <Col sm={6} style={{ backgroundColor: "" }}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      className="signin_form"
                      type="text"
                      placeholder="Enter Your Email "
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />

                    {formik.errors.email && formik.touched.email ? (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {" "}
                        {formik.errors.email}{" "}
                      </span>
                    ) : null}
                  </Form.Group>
                </Col>

                {/* PassWord*/}
                <Col sm={6} style={{ backgroundColor: "" }}>
                  {/*  First Name */}
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      className="signin_form"
                      type="password"
                      placeholder="Enter Your Password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />

                    {formik.errors.password && formik.touched.password ? (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {" "}
                        {formik.errors.password}{" "}
                      </span>
                    ) : null}
                  </Form.Group>
                </Col>

                {/* Confirm Password*/}
                <Col sm={6} style={{ backgroundColor: "" }}>
                  {/* Last Name */}

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label style={{ color: "#fff", fontWeight: "bold" }}>
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      className="signin_form"
                      type="password"
                      placeholder="Confirm Your Password"
                      name="password1"
                      value={formik.values.password1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.password1 && formik.touched.password1 ? (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {" "}
                        {formik.errors.password1}{" "}
                      </span>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col></Col>
              </Row>

              <button
                className=" my-3 home_navigation_getDemo2"
                type="submit"
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Please wait..." : buttonText}{" "}
              </button>
            
        
            </Form>

            <p
              style={{
                color: "gray",
                textAlign: "center",
                fontSize: "12px"
              }}
            >
              By signing up, you agree to our Privacy Policy, Terms of Service,{" "}
              <br /> and Fair Use Policy.
            </p>
            {/* 
            <GoogleLogin
                          clientId="353531269526-un4ro55bjf7qb39stbb256ktfoscllfi.apps.googleusercontent.com"
                          buttonText="Sign up with Google"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy={'single_host_origin'}
                        />
                        */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUp;
