import SignUpIllustration from "../assets/Illustrations/signup.png";
// Form handling
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../Redux/actions/Auth.action";
// Routes
import { Link } from "react-router-dom";
// Services
import { userSignin } from "../services/AuthServices";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import LoaderService from "../services/LoaderService";

const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);
  console.log(isError, isLoading);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const signin = async (data) => {
    console.log(data);
    dispatch(setLoading(true));
    try {
      const response = await userSignin(data);
      dispatch(setUser(response.data));
      console.log(response);
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
        Sign In
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
          onSubmit={handleSubmit(signin)}
        >
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
          <button className="bg-orange-500 text-md font-bold text-white w-[300px] px-3 py-3 rounded-md xl:w-[400px]">
            {isLoading ? <LoaderService size={5} /> : "CONTINUE"}
          </button>
          <div className="flex items-center justify-between space-x-8">
            <p>I don't have an account?</p>
            <Link to="/signup" className="font-bold text-orange-500">
              Sign Up
            </Link>
          </div>
        </form>
      </section>
      {isError ? (
        <p className="text-red-500 bg-red-200 font-bold border border-red-500 w-[300px] px-3 py-3 rounded-md xl:w-[500px] mt-5">
          <FontAwesomeIcon icon={faExclamationCircle} /> {isError}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignIn;
