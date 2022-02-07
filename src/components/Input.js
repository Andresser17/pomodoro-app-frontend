function Input(props) {
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

export default Input;
