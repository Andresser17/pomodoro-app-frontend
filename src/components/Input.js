function Input(props) {
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
        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${props.dim?.input}`}
        placeholder={props.placeholder}
        required=""
      />
    </div>
  );
}

export default Input;
