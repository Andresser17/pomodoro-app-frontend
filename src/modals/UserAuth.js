// Components
import Input from "../components/Input";

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
      <Input
        dim={{ input: "w-full" }}
        labelText={{ text: "Your email" }}
        placeholder="name@company.com"
        type="email"
        name="email"
      />
      <Input
        dim={{ input: "w-full" }}
        labelText={{ text: "Your password" }}
        placeholder="••••••••"
        type="password"
        name="password"
      />
      <Input
        dim={{ input: "w-full" }}
        labelText={{ text: "Repeat password" }}
        placeholder="••••••••"
        type="password"
        name="repeat-password"
      />
      <FormSubmit text="Register an account" />
      <div className="text-sm font-medium">
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
      <Input
        dim={{ input: "w-full" }}
        labelText={{ text: "Your email" }}
        placeholder="name@company.com"
        type="email"
        name="email"
      />
      <Input
        dim={{ input: "w-full" }}
        labelText={{ text: "Your password" }}
        placeholder="••••••••"
        type="password"
        name="password"
      />
      <AuthRemember />
      <FormSubmit text="Login to your account" />
      <div className="text-sm font-medium">
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
  return (
    <div className="w-[22rem] text-gray-900 dark:text-gray-300">
      {props.signUp ? <UserSignUp /> : <UserSignIn />}
    </div>
  );
}

export default UserAuth;
