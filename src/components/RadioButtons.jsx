const RadioButtons = ({onChange, id, options = [], legend}) => {
  return (
    <div className="radio-buttons">
      <fieldset onChange={onChange} class="flex mt-4 w-80" id={id}>
        <legend class="sr-only">{legend}</legend>

        <div class="flex flex-col space-y-4 mb-4">
          {options.map((option, i) => {
            return (
              <div class="flex items-center" key={i}>
                <input
                  type="radio"
                  name={id}
                  value={option.value}
                  class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for={id}
                  class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default RadioButtons;
