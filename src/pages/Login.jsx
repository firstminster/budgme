import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../features/authUserSlice";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { decoded } = useAuth();

  //  retrieve the auth data from the global store
  const { authUser } = useSelector((state) => state);

  // console.log(userInfo);

  const { userInfo } = authUser;

  console.log(userInfo);

  // react-hook-form
  const {
    register,
    // watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (userInfo && userInfo?.response?.user?.username === decoded?.username) {
      navigate("/budget");
    }

    //   return () => {
    //     second
    //   }
  }, [navigate, userInfo]);

  // submit handler
  const onSubmit = async (data) => {
    dispatch(userLogin(data));
    reset();
  };

  return (
    <form
      className={"login-form"}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        {/* <Link to="/" className="login-header">
          Budgify
        </Link> */}
        <h2 className="">Sign in to your account</h2>
      </div>
      <div className="form-control">
        <label className="">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          {...register("username", {
            required: "Please enter a valid username",
          })}
          className={`input-field ${
            errors.username ? "errorInputField" : null
          }`}
          //   className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //     errors.username ? "border-red-500" : null
          //   }`}
        />
        {errors.username && (
          <p className="errorMsg">{errors.username.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", {
            required: "Please enter a valid password",
          })}
          className={`input-field ${
            errors.password ? "errorInputField" : null
          }`}
          //   className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //     errors.password ? "border-red-500" : null
          //   }`}
        />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="btn ">
        Sign in
      </button>
    </form>
  );
};

export default LoginPage;
