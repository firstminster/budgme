/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../features/authUserSlice";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //   const { userInfo, decoded } = useAuth();

  const { userInfo } = useSelector((state) => state.authUser);

  console.log(userInfo);

  let decoded;

  if (userInfo?.response?.token?.access) {
    decoded = jwtDecode(userInfo?.response.token.access);

    // console.log(decoded);
    // return { decoded, userInfo };
  }

  console.log(location);
  console.log(decoded?.username);
  console.log(userInfo);

  let isLoggedInUser = userInfo?.response?.user?.username;

  console.log(isLoggedInUser);

  // check if the user is logged in
  const userIsLoggedIn =
    userInfo && decoded?.username == isLoggedInUser ? true : false;

  // Refresh the token a minute early to avoid latency issues
  const expirationTime = decoded?.exp * 1000 - 6000;

  console.log(userIsLoggedIn);

  // cause a side-effect
  useEffect(() => {
    // checks for a user in the localStorage
    if (userInfo) {
      // checks if the token expire time is less than the current time then logout the user.
      if (expirationTime <= Date.now()) {
        dispatch(logout());
        toast.warn("Session has expired. Please Log in to continue!");
      }
    }
  }, [location]);

  return userIsLoggedIn ? (
    <Outlet />
  ) : userInfo ? (
    <div>ProtectedRoute</div>
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} replace />
  );
};

export default ProtectedRoute;
