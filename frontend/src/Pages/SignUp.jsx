import SignUpIllustration from "../assets/Illustrations/signup.png";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
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

  const userSignup = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center mx-5">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <section>
        <img src={SignUpIllustration} alt="SignUp_illustration" className="mt-10" width={270}/>
        <form
          className="flex flex-col items-center space-y-3 mt-5"
          onSubmit={handleSubmit(userSignup)}
        >
          <div>
            <input
              type="text"
              placeholder="Username"
              className={
                errors.userName
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md"
              }
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-sm text-red-500 w-[300px] mt-2 mb-2">
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
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md"
              }
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 w-[300px] mt-2 mb-2">
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
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md"
              }
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 w-[300px] mt-2 mb-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className={
                errors.confirmPassword
                  ? "border border-red-500 placeholder:text-red-500 w-[300px] px-3 py-3 rounded-md outline-none"
                  : "bg-gray-100 w-[300px] px-3 py-3 rounded-md"
              }
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 w-[300px] mt-2 mb-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button className="bg-orange-500 text-md font-bold text-white w-[300px] px-3 py-3 rounded-md">CONTINUE</button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
