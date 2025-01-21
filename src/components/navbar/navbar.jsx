import React from "react";
import { Box, Button } from "@mui/material";
import swiggy from "../../images/swiggy.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = ({ user, cart }) => {
  const Navigate = useNavigate();
  function handleLogout() {
    localStorage.setItem("current-user", null);
    Navigate("/");
  }

  function handelCart() {
    Navigate(`/${user.email}/cart`);
  }

  return (
    <>
      {user && (
        <>
          <Box className="navbar-container">
            <Box className="swiggy-logo">
              {" "}
              <img src={swiggy} alt="" />
            </Box>
            <Box className="current-user-name">Welcome {user.firstName}</Box>
            {cart && (
              <Button
                disableRipple
                disableElevation
                className="logout-button"
                onClick={handelCart}
              >
                {" "}
                Go to Cart
              </Button>
            )}

            <Button
              disableRipple
              disableElevation
              className="logout-button"
              onClick={handleLogout}
            >
              {" "}
              Log out
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default Navbar;
