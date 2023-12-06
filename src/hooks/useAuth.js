import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  //  retrieve the auth data from the global store
  const { userInfo } = useSelector((state) => state.authUser);

  console.log(userInfo);

  if (userInfo?.response.token.access) {
    const decoded = jwtDecode(userInfo?.response.token.access);

    // console.log(decoded);
    return { decoded, userInfo };
  }

  return { userInfo };
};

export default useAuth;
