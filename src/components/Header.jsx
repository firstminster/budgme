/* eslint-disable react/prop-types */
// import React from "react";

export const Header = ({ username }) => {
  return <h2>Welcome, {username ? username : "Unknown user"}</h2>;
};
