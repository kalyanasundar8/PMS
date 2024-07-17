import SignUpIllustration from "../assets/Illustrations/signup.png"

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <section>
        <img src={SignUpIllustration} alt="SignUp_illustration" />
        <form>
          <div>
            <input type="text" placeholder="Username" />
          </div>
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <button>CONTINUE</button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
