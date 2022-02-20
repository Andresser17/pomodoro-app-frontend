import { useState, useEffect } from "react";

function Input(props) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const key = props.name
      .split("-")
      .map((word, i) => (i > 0 ? word[0].toUpperCase() + word.slice(1) : word))
      .join("");
    const newValue =
      props.type === "number" ? Number(e.target.value) : e.target.value;
    // Save new current value
    props.saveChange(key, newValue);
    setValue(newValue);
  };

  // Set props.value if provided
  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <div className={props.dim?.cont}>
      <label
        htmlFor={props.name}
        className={`block mb-2 ${props.labelText?.style}`}
      >
        {props.labelText?.text}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        value={value}
        onChange={handleChange}
        className={`dark:border-gray-500 bg-gray-50 border text-gray-900 sm:text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${props.dim?.input}`}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Input;
