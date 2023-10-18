import React, { Component, useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "../index.css";
import routes from "routes.js";
import logo from "../../assets/img/profile_img.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  //Starter Plan
  const [starter, setstarter] = useState(false);
  const starterPlan = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

    const url = `${process.env.REACT_APP_BASE_URL}starter`;
    const accessToken = authToken;
    const data = {
      planname: "Starter",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    setstarter(true); // Start loader

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const responseURL = data.url;
        data.message == ""
          ? toast.success(data.message)
          : toast.warning(data.message);

        if (responseURL) {
          setTimeout(() => {
            setstarter(false); // Stop loader after 5 seconds
            window.open(responseURL, "_blank");
          }, 2000);
        }
      })
      .catch((error) => {
        setstarter(false); // Stop loader if there's an error
      });

    // Hide Modal After Clicking On Buy Starter Plan Button
    setTimeout(() => {
      props.onHide();
    }, 1000);
  };

  //Essential Plan
  const [essential, setEssential] = useState(false);
  const essentialPlan = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

    const url = `${process.env.REACT_APP_BASE_URL}essential`; // Replace with your API endpoint
    const accessToken = authToken;
    const data = {
      planname: "Essential",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    setEssential(true); // Start loader

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const responseURL = data.url;
        if (responseURL) {
          setTimeout(() => {
            setEssential(false); // Stop loader after 5 seconds
            window.open(responseURL, "_blank");
          }, 2000);
        }
      })
      .catch((error) => {
        setEssential(false); // Stop loader if there's an error
      });
  };

  // Pro Plan
  const [pro, setPro] = useState(false);
  const proPlan = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

    const url = `${process.env.REACT_APP_BASE_URL}pro`;
    const accessToken = authToken;
    const data = {
      planname: "Pro",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    setPro(true); // Start loader

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const responseURL = data.url;
        if (responseURL) {
          setTimeout(() => {
            setPro(false); // Stop loader after 5 seconds
            window.open(responseURL, "_blank");
          }, 2000);
        }
      })
      .catch((error) => {
        setPro(false); // Stop loader if there's an error
      });
  };
  //Ultimate Plan
  const [ultimate, setUltimate] = useState(false);
  const ultimatePlan = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

    const url = `${process.env.REACT_APP_BASE_URL}ultimate`; // Replace with your API endpoint
    const accessToken = authToken;
    const data = {
      planname: "Ultimate",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    setUltimate(true); // Start loader

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const responseURL = data.url;
        if (responseURL) {
          setTimeout(() => {
            setUltimate(false); // Stop loader after 5 seconds
            window.open(responseURL, "_blank");
          }, 2000);
        }
      })
      .catch((error) => {
        setUltimate(false); // Stop loader if there's an error
      });
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Button style={{ marginLeft: "auto" }} onClick={props.onHide}>
          X
        </Button>
      </Modal.Header>

      <Modal.Body>
        <Container style={{ backgroundColor: "" }}>
          <div className="snip1517">
            <div className="plan">
              <header>
                <h4 className="plan-title">Starter</h4>
                <div className="plan-cost">
                  <span className="plan-price">Free</span>
                  <span className="plan-type"></span>
                </div>
              </header>
              <ul className="plan-features">
                <li>
                  <i className="ion-android-remove"> </i>5 Profiles Per Month
                </li>
                <li>
                  <i className="ion-android-remove"> </i>1 User Access
                </li>
                <li>
                  <i className="ion-android-remove"> </i>
                </li>
                <li>
                  <i className="ion-android-remove"> </i>
                </li>
              </ul>
              <div className="plan-select">
                <Button
                  className="inner_pricing"
                  onClick={starterPlan}
                  variant="primary"
                  disabled={props.plan != null || starter}
                >
                  {starter ? "Upgrade " : "Upgrade"}
                </Button>{" "}
              </div>
            </div>
            <div className="plan">
              <header>
                <h4 className="plan-title">Essential</h4>
                <div className="plan-cost">
                  <span className="plan-price">$48.90</span>
                  <span className="plan-type">/month</span>
                </div>
              </header>
              <ul className="plan-features">
                <li>
                  <i className="ion-android-remove"> </i>25 Profiles Per Month
                </li>
                <li>
                  <i className="ion-android-remove"> </i>Your Branding
                </li>
                <li>
                  <i className="ion-android-remove"> </i>Removed Watermark
                </li>
                <li>
                  <i className="ion-android-remove"> </i>2 Users
                </li>
              </ul>
              <div className="plan-select">
                <Button
                  className="inner_pricing"
                  onClick={essentialPlan}
                  variant="primary"
                  disabled={props.plan == "Essential" || essential}
                >
                  {essential ? "Please wait..." : "Upgrade"}
                </Button>{" "}
              </div>
            </div>
            <div className="plan ">
              <header>
                <h4 className="plan-title">Pro</h4>
                <div className="plan-cost">
                  <span className="plan-price">$87.90</span>
                  <span className="plan-type">/month</span>
                </div>
              </header>
              <ul className="plan-features">
                <li>
                  <i className="ion-android-remove"> </i> 50 Profiles per month
                </li>
                <li>
                  <i className="ion-android-remove"> </i>Your branding
                </li>
                <li>
                  <i className="ion-android-remove"> </i>Removed Watermark
                </li>
                <li>
                  <i className="ion-android-remove"> </i>4 Users
                </li>
              </ul>
              <div className="plan-select">
                <Button
                  className="inner_pricing"
                  onClick={proPlan}
                  variant="primary"
                  disabled={props.plan == "pro" || pro}
                >
                  {pro ? "Please wait..." : "Upgrade"}
                </Button>{" "}
              </div>
            </div>
            <div className="plan">
              <header>
                <h4 className="plan-title">Ultimate</h4>
                <div className="plan-cost">
                  <span className="plan-price">$149.90</span>
                  <span className="plan-type">/month</span>
                </div>
              </header>
              <ul className="plan-features">
                <li>
                  <i className="ion-android-remove"> </i> Unlimited Profiles
                </li>
                <li>
                  <i className="ion-android-remove"> </i>Your branding
                </li>
                <li>
                  <i className="ion-android-remove"> </i>Removed Watermark
                </li>
                <li>
                  <i className="ion-android-remove"> </i>8 Users
                </li>
              </ul>
              <div className="plan-select">
                <Button
                  className="inner_pricing"
                  onClick={ultimatePlan}
                  variant="primary"
                  disabled={props.plan == "ultimate" || ultimate}
                >
                  {ultimate ? "Please wait..." : "Upgrade"}
                </Button>{" "}
              </div>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

function Header() {
  const [username, setUsername] = useState();
  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("userName")));
  }, []);

  const [plandetails, setPlandetails] = useState();

  // Plan Details API
  useEffect(() => {
    planDetails();
  }, []);
  function planDetails() {
    let store = JSON.parse(localStorage.getItem("login"));
    let authToken = store.token;

    const url = `${process.env.REACT_APP_BASE_URL}planname_cvcount`;
    const accessToken = authToken;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      // body: JSON.stringify(data),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPlandetails(data);
        if (data.planname === "pro") {
          console.log("you have taken Pro Plan");
        } else {
        }
      })

      .catch((error) => {});
  }

  const [modalShow, setModalShow] = React.useState(false);
  let history = useHistory();
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const logOut = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userName");
    toast.error("Logout ", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message",
    });
    history.push("/signin");
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid style={{ backgroundColor: "" }}>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>

          {/* One */}

          <div className="navbar_text">
            <h4>
              Welcome back, {username && username.fname ? username.fname : ""}
            </h4>
            <p>Hey,What's happening!</p>
          </div>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ml-auto"
            navbar
            style={{
              backgroundColor: "",
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href=""
                onClick={(e) => e.preventDefault()}
              >
                {plandetails?.planname ? (
                  <span
                    className="nav_free_btn"
                    style={{ textTransform: "capitalize" }}
                  >
                    {" "}
                    {plandetails?.planname} : {plandetails?.cv_count}
                  </span>
                ) : (
                  "No Active Plan"
                )}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <button
                className="home_navigation_getDemo2"
                type="submit"
                onClick={() => setModalShow(true)}
              >
                Upgrade Plan
              </button>

              <MyVerticallyCenteredModal
                show={modalShow}
                plan={plandetails?.planname}
                onHide={() => setModalShow(false)}
              />
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="dropdown-67443507"
                  variant="default"
                  className="m-0"
                >
                  <img
                    src={logo}
                    alt=""
                    srcSet=""
                    style={{ width: "30px", borderRadius: "30px" }}
                  />

                  {/*  <span className="notification">2</span> */}
                  <span className="d-lg-none ml-1">Notification</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                  <Dropdown.Item>
                    <Link
                      to="/forgot-password"
                      style={{ color: "#333333", textDecoration: "none" }}
                    >
                      Reset Password
                    </Link>
                  </Dropdown.Item>
                  <ToastContainer autoClose={2000} />
                  <Dropdown.Item href="" onClick={logOut}>
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
