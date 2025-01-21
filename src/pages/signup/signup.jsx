import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LeftImage from "../../images/left-image.png";
import facebook from "../../images/facebook.png";
import google from "../../images/google.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import CustomInput from "../../components/input/input";
import {useDispatch , useSelector} from "react-redux"
import {addUser} from "../../features/slice/user.js"
import {uid} from "uid"
import "./signup.css";
const SignUp = () => {


  const dispatch = useDispatch();
  const user= useSelector(state=>state.user.usersData);
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checked, setChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    firstNameError: false,
    emailError: false,
    passwordError: false,
  });


  function handleFirstName(e) {
    setInput({
      email: input.email,
      firstName: e.target.value,
      password: input.password,
    });
    if (e.target.value.replace(/\s+/g, " ").trim().length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        firstNameError: true,
      });
    } else {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        firstNameError: false,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        firstNameError: false,
      });
    }
  }

  function handleEmail(e) {
    setInput({
      email: e.target.value,
      firstName: input.firstName,
      password: input.password,
    });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(e.target.value)) {
      setError({
        emailError: true,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
      });
    } else {
      setError({
        emailError: false,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: false,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
      });
    }
  }

  function handlePassword(e) {
    setInput({
      email: input.email,
      firstName: input.firstName,
      password: e.target.value,
    });
    var passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(e.target.value)) {
      setError({
        emailError: error.emailError,
        passwordError: true,
        firstNameError: error.firstNameError,
      });
    } else {
      setError({
        emailError: error.emailError,
        passwordError: false,
        firstNameError: error.firstNameError,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: false,
        firstNameError: error.firstNameError,
      });
    }
  }


  function handleSignUp(e) {

    e.preventDefault();
    if (!checked) {
      setCheckboxError(true);
      return;
    }
  



 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/;
    let currentEmailError = false;
    let currentPasswordError = false;
    let currentFirstNameError = false;
    if (!emailPattern.test(input.email)) {
      currentEmailError = true;
      console.log(error);
    }
    if (
      input.firstName.replace(/\s+/g, " ").trim().length <= 0 ||
      input.firstName <= 0
    ) {
      currentFirstNameError = true;
    }

    if (!passwordPattern.test(input.password)) {
      currentPasswordError = true;
    }

    setError({
      emailError: currentEmailError,
      passwordError: currentPasswordError,
      firstNameError: currentFirstNameError,
    });
   
      console.log(user);
      let particularUser = null;
      if (user) {
        particularUser = user.find(({email})=>email===input.email);
       
      }


      if (particularUser) {
        alert("Already register!");
        // navigate("/");
      } else if (
        passwordPattern.test(input.password) &&
        input.firstName.replace(/\s+/g, " ").trim().length > 0 &&
        emailPattern.test(input.email)
      ) {

        dispatch(addUser({
          email: input.email,
          firstName: input.firstName,
          password: input.password,
          id:uid(10)
        }))
        setError({
          emailError: false,
          passwordError: false,
          firstNameError: false,
        });
        navigate("/");
        setInput({
          email: "",
          password: "",
          firstName: "",
        });
      }
  }

  function handleCheckbox() {
    setChecked(!checked);
  }

  return (
    <Box className="container-signup">
     {/* {JSON.stringify(user)} */}
      <Box className="left-container">
      <img src={LeftImage} alt="" />
      </Box>
      <Box className="right-container">
        <Box className="sigup-functionality">
          <Box className="login-text">Sign Up</Box>
          <Box className="upper-text">Create your account in a seconds</Box>
          <Box className="form">
            <form action="">
              <Box className="input">
                <CustomInput
                  value={input.firstName}
                  errorState={error.firstNameError}
                  className="input-password"
                  handlerState={handleFirstName}
                  label="Name:"
                ></CustomInput>
                {error.firstNameError && (
                  <Box
                    style={{
                      color: "red",
                      marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct firstname
                  </Box>
                )}
              </Box>
              <Box className="input">
                <CustomInput
                  value={input.email}
                  errorState={error.emailError}
                  className="input-email"
                  handlerState={handleEmail}
                  label="Email Address:"
                ></CustomInput>
              </Box>
              {error.emailError && (
                <Box
                  style={{
                    color: "red",
                    marginTop: "-14px",
                    marginBottom: "10px",
                  }}
                >
                  Enter correct email
                </Box>
              )}

              <Box className="input">
                <CustomInput
                  value={input.password}
                  errorState={error.passwordError}
                  className="input-password"
                  handlerState={handlePassword}
                  label="Create Password:"
                ></CustomInput>
              </Box>
              {error.passwordError && (
                <Box
                  style={{
                    color: "red",
                    marginTop: "-14px",
                    marginBottom: "10px",
                  }}
                >
                  Enter correct password
                </Box>
              )}

              <Box className="feature-container">
                <Box className="check-box">
                  <Checkbox
                    onClick={handleCheckbox}
                    checked={checked}
                    sx={{
                      color: "#7754F6",
                      "&.Mui-checked": {
                        color: "#7754F6",
                      },
                    }}
                    {...label}
                  />
                  I agree to the terms and privacy policy
                  {checkboxError && (
                    <Box
                      style={{
                        color: "red",
                        marginTop: "-14px",
                        marginBottom: "10px",
                      }}
                    >
                      Please tick checkbox
                    </Box>
                  )}
                </Box>
              </Box>
              <Button
                onClick={handleSignUp}
                // diableripple
                disableElevation
                sx={{
                  bgcolor: "#7754f6",
                  color: "#FFFFFF",
                  width: "25vw",
                  height: "45px",
                  marginTop: "-5px",
                  borderRadius: "10px",
                  textTransform: "none",
                }}
                className="sinup-button"
              >
                Create an account
              </Button>
            </form>
            <Box className="signin-link">
              <Box component={"span"}>
                Alredy a member? <Link to="/">Login</Link>{" "}
              </Box>
            </Box>
            <Box className="continue-with">
              <Box className="line"></Box>

              <Box className="continue-text">Or continue with</Box>
              <Box className="line"></Box>
            </Box>

            <Box className="third-party-signin">
              <Box className="inside-third-party-signin">
                <Box className="third-party-images">
                  <img src={google} alt="" />
                </Box>
                <Box className="third-party-images">
                  <img src={facebook} alt="" />
                </Box>
                <Box className="third-party-images">
                  <img src={instagram} alt="" />
                </Box>
                <Box className="third-party-images">
                  <img src={twitter} alt="" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
