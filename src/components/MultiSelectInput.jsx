import {useState} from "react";
import {toast} from "react-hot-toast";
import Select from "react-select";

function MultiSelectInput({
  selectedValues,
  setSelectedValues,
  onChange,
  placeholder,
  options,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.trim();
      const _inputValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

      if (inputValue !== "") {
        const newOption = {value: _inputValue, label: _inputValue};

        const index = selectedValues.findIndex(
          (option) => (
            option.value === newOption.value,
            option.value === newOption.value &&
              option.label === newOption.label &&
              toast.error("This value already exists")
          )
        );

        if (index !== -1) {
          const newSelectedValues = [...selectedValues];
          newSelectedValues[index] = newOption;
          setSelectedValues(newSelectedValues);
        } else {
          setSelectedValues([...selectedValues, newOption]);
        }

        setInputValue("");
      }

      console.log("selectedValues", selectedValues);
      event.preventDefault();
    }
  };

  return (
    <Select
      options={options}
      value={selectedValues}
      inputValue={inputValue}
      isMulti
      onKeyDown={(event) => handleKeyDown(event)}
      onInputChange={(value) => setInputValue(value)}
      onChange={onChange}
      placeholder={placeholder}
      createOptionPosition="first"
      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
    />
  );
}

export default MultiSelectInput;
