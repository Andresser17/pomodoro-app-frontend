function FormInput(props) {
  const error = props.resolver?.error;

  return (
    <div className={props.dim?.cont}>
      <label
        htmlFor={props.name}
        className={`block mb-2 ${props.labelText.style}`}
      >
        {props.labelText.text}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className={`${
          error ? "border-red-400" : "border-gray-300 dark:border-gray-500"
        } bg-gray-50 border text-gray-900 sm:text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${
          props.dim?.input
        }`}
        placeholder={props.placeholder}
        {...props.resolver?.func}
      />
      {error?.message && (
        <span className="block w-full mt-1 text-sm text-red-400">
          {error?.message}
        </span>
      )}
    </div>
  );
}

export default FormInput;
