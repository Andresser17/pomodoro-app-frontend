import { useState, useEffect } from "react";

function Selection(props) {
  const [value, setValue] = useState("");
  const options = props.options?.map((item, i) => {
    return (
      <option value={item.name} key={i}>
        {item.name.split("")[0].toUpperCase() + item.name.slice(1)}
      </option>
    );
  });

  const handleChange = (e) => {
    const newValue = e.target.value;
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
      <select
        className={`dark:border-gray-500 bg-gray-50 border text-gray-900 sm:text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${props.dim?.select}`}
        name={props.name}
        id={props.name}
      >
        {options}
        {/* <option value="volvo">Volvo</option> */}
        {/* <option value="saab">Saab</option> */}
        {/* <option value="mercedes">Mercedes</option> */}
        {/* <option value="audi">Audi</option> */}
      </select>
      {/* <input */}
      {/*   type={props.type} */}
      {/*   name={props.name} */}
      {/*   id={props.name} */}
      {/*   value={value} */}
      {/*   onChange={handleChange} */}
      {/*   className={`dark:border-gray-500 bg-gray-50 border text-gray-900 sm:text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${props.dim?.input}`} */}
      {/*   placeholder={props.placeholder} */}
      {/* /> */}
    </div>
  );
}

export default Selection;
