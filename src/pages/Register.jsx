import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
import { logout, userRegister } from "../features/authUserSlice";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    // watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handler
  const onSubmit = (data) => {
    dispatch(userRegister(data));
    // console.log(data);
    dispatch(logout());
    setTimeout(() => navigate("/login"), 1000);
    reset();
  };

  return (
    <form
      className={"login-form"}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <Link to="/" className="login-header">
          Budgify
        </Link> */}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your Budgify account
        </h2>
      </div>
      <div className="login-fieldset">
        <label className="block text-[15px] lg:text-base font-normal text-jet">
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          {...register("first_name", {
            required: "Please enter a valid first name",
          })}
          className={`input-field ${
            errors.first_name ? "errorInputField" : null
          }`}
          // className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //   errors.firstname ? "border-red-500" : null
          // }`}
        />
        {errors.first_name && (
          <p className="errorMsg">{errors.first_name.message}</p>
        )}
      </div>

      <div className="">
        <label className="block text-[15px] lg:text-base font-normal text-jet">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          {...register("last_name", {
            required: "Please enter a valid last name",
          })}
          className={`input-field ${
            errors.last_name ? "errorInputField" : null
          }`}
          // className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //   errors.lastname ? "border-red-500" : null
          // }`}
        />
        {errors.last_name && (
          <p className="errorMsg">{errors.last_name.message}</p>
        )}
      </div>

      <div className="">
        <label className="block text-[15px] lg:text-base font-normal text-jet">
          Username
        </label>
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
          // className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //   errors.lastname ? "border-red-500" : null
          // }`}
        />
        {errors.username && (
          <p className="errorMsg">{errors.username.message}</p>
        )}
      </div>

      <div className="login-fieldset">
        <label className="block text-[15px] lg:text-base font-normal text-jet">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: "Please enter a valid email address",
          })}
          className={`input-field ${errors.email ? "errorInputField" : null}`}
          // className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //   errors.email ? "border-red-500" : null
          // }`}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      </div>

      <div className="">
        <label className="block text-[15px] lg:text-base font-normal text-jet">
          Password
        </label>
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
          // className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //   errors.password ? "border-red-500" : null
          // }`}
        />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>
        )}
      </div>

      <div className="">
        <label className="block text-[15px] lg:text-base font-normal text-jet">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Password"
          {...register("confirm_password", {
            required: "Please enter a valid password",
          })}
          className={`input-field ${
            errors.confirm_password ? "errorInputField" : null
          }`}
          // className={`block w-full h-[50px] appearance-none rounded-[10px] border border-quick-silver px-3 py-2 placeholder-quick-silver shadow-sm focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm ${
          //   errors.confirmpassword ? "border-red-500" : null
          // }`}
        />
        {errors.confirm_password && (
          <p className="errorMsg">{errors.confirm_password.message}</p>
        )}
      </div>

      <button type="submit" className="btn bg-blue-primary">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
