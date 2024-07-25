import SignUpIllustration from "../assets/Illustrations/signup.png";
// Form handling
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../Redux/actions/Auth.action";
// Routes
import { Link, useNavigate } from "react-router-dom";
// Services
import { userSignup } from "../services/AuthServices";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import LoaderService from "../services/LoaderService";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters, contain one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const signup = async (data) => {
    dispatch(setLoading(true));
    try {
      const response = await userSignup(data);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response?.data));
        navigate("/");
        window.location.reload();
        dispatch(setUser(response.data));
      }
    } catch (error) {
      dispatch(setError(error.response.data.err));
      setTimeout(() => {
        dispatch(setError(""));
      }, 3000);
      console.log(error.response.data.err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center h-[100vh] gbackround">
      <h1 className="font-titlefont text-2xl font-bold mt-10 xl:text-[40px] xl:mt-[50px]">
        Sign Up
      </h1>
      <section className="font-primaryfont mt-10 xl:mt-[30px] bg-white px-5 py-5 shadow-md xl:flex xl:px-[50px] xl:py-[20px] rounded-md">
        <img
          src={SignUpIllustration}
          alt="SignUp_illustration"
          className="mt-10 w-[400px] h-[300px] hidden"
          width={270}
        />
        <form
          className="flex flex-col items-center space-y-3 mt-5"
          onSubmit={handleSubmit(signup)}
        >
          <div>
            <input
              type="text"
              placeholder="Username"
              className={
                errors.userName
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none xl:w-[400px] mb-2"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md xl:w-[400px] mb-2"
              }
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-sm font-bold text-red-500 w-[300px]">
                <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                {errors.userName.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className={
                errors.email
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none xl:w-[400px] mb-2"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md xl:w-[400px] mb-2"
              }
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 font-bold w-[300px] mt-2 mb-2 transition-opacity duration-500 ease-in-out">
                <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className={
                errors.password
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none xl:w-[400px] mb-2"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md xl:w-[400px] mb-2"
              }
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 font-bold w-[300px] mt-2 mb-2 xl:w-[400px]">
                <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm-Password"
              className={
                errors.confirmPassword
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none xl:w-[400px] mb-2"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md xl:w-[400px] mb-2"
              }
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 font-bold w-[300px] mt-2 mb-2">
                <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button className="bg-orange-500 text-md font-bold text-white w-[300px] px-3 py-3 rounded-md xl:w-[400px]">
            {isLoading ? <LoaderService size={5} /> : "CONTINUE"}
          </button>
          <div className="flex items-center justify-between space-x-8">
            <p>Already I have an account?</p>
            <Link to="/signin" className="font-bold text-orange-500">
              Sign In
            </Link>
          </div>
        </form>
      </section>
      {isError ? (
        <p className="text-red-500 bg-red-200 font-bold border border-red-500 w-[300px] px-3 py-3 rounded-md xl:w-[500px] mt-5 mb-5">
          <FontAwesomeIcon icon={faExclamationCircle} /> {isError}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignUp;
