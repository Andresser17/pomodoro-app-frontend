function AuthRemember(props) {
  return (
    <div className="flex justify-between">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            required=""
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="remember"
            className="font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
      </div>
      <a
        href="#"
        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
      >
        Lost Password?
      </a>
    </div>
  );
}

function AuthInput(props) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {props.labelText}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder={props.placeholder}
        required=""
      />
    </div>
  );
}

function FormSubmit(props) {
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {props.text}
    </button>
  );
}

function AuthForm(props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
    >
      {props.children}
    </form>
  );
}

function UserSignUp(props) {
  return (
    <AuthForm>
      <AuthInput
        labelText="Your email"
        placeholder="name@company.com"
        type="email"
        name="email"
      />
      <AuthInput
        labelText="Enter password"
        placeholder="••••••••"
        type="password"
        name="password"
      />
      <AuthInput
        labelText="Repeat password"
        placeholder="••••••••"
        type="password"
        name="repeat-password"
      />
      <FormSubmit text="Register an account" />
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        You have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Sign In
        </a>
      </div>
    </AuthForm>
  );
}

function UserSignIn(props) {
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthForm onSubmit={handleOnSubmit}>
      <AuthInput
        labelText="Your email"
        placeholder="name@company.com"
        type="email"
        name="email"
      />
      <AuthInput
        labelText="Your password"
        placeholder="••••••••"
        type="password"
        name="password"
      />
      <AuthRemember />
      <FormSubmit text="Login to your account" />
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Create account
        </a>
      </div>
    </AuthForm>
  );
}

function UserAuth(props) {
  return props.signUp ? <UserSignUp /> : <UserSignIn />;
}

export default UserAuth;
